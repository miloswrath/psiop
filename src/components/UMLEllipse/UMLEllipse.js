import React, { useState, useRef, useEffect } from "react";
import "./UMLEllipse.css";
import Popup from "../Popup/Popup";
import svgMap from "./svgMap.json";

const svgRequire = require.context("../../assets/svgs", true, /\.svg$/);

const UMLEllipse = ({
  region = "middle",
  width = "100%",
  borderColor = "#000",
  label,
  scores = {},
}) => {
  // 1. Pull the right filenames for this region
  const filenames = svgMap[region] || [];

  // 2. Dynamically require each SVG (skip any that fail)
  const icons = filenames
    .map((name) => {
      try {
        return svgRequire(`./${name}`);
      } catch {
        console.error(`SVG not found: ${name}`);
        return null;
      }
    })
    .filter(Boolean);

  const count = icons.length;
  const angleStep = (Math.PI * 2) / count;

  // popup state
  const [activeIdx, setActiveIdx] = useState(null);

  // radius calculation
  const ellipseRef = useRef(null);
  const [radiusPercent, setRadiusPercent] = useState(45);
  useEffect(() => {
    if (ellipseRef.current) {
      const diameter = ellipseRef.current.offsetWidth;
      const iconSize = 36;
      const centerToEdge = diameter / 2;
      const desiredRadius = centerToEdge + iconSize * 0.25;
      setRadiusPercent((desiredRadius / centerToEdge) * 50);
    }
  }, []);

  const getColorFromScore = (score) => {
    if (score >= 70) return "#66cc66";
    if (score >= 40) return "#ffd700";
    return "#ff6666";
  };

  // 3. Build the background gradients by key, not index
  const gradientStops = filenames.map((fname, idx) => {
    const angle = angleStep * idx - Math.PI / 2;
    const x = 50 + 50 * Math.cos(angle);
    const y = 50 + 50 * Math.sin(angle);

    const key = fname.replace(".svg", "");
    const score = scores[key] ?? 70;
    const color = getColorFromScore(score);

    return `radial-gradient(circle at ${x}% ${y}%, ${color} 30%, transparent 70%)`;
  });

  const backgroundStyle = {
    border: `2px solid ${borderColor}`,
    backgroundImage: gradientStops.reverse().join(", "),
  };

  return (
    <div className="ellipse-wrapper" style={{ width }}>
      <div className="ellipse" ref={ellipseRef} style={backgroundStyle}>
        {label && <span className="ellipse-label">{label}</span>}
        {icons.map((src, idx) => {
          const angle = angleStep * idx - Math.PI / 2;
          const x = 50 + radiusPercent * Math.cos(angle);
          const y = 50 + radiusPercent * Math.sin(angle);

          const fname = filenames[idx];
          const iconKey = fname.replace(".svg", "");
          const score = scores[iconKey] ?? 70;
          const outlineColor = getColorFromScore(score);

          return (
            <button
              key={iconKey}
              className="ellipse-icon-button"
              style={{
                top: `${y}%`,
                left: `${x}%`,
                backgroundColor: "white",
                borderRadius: "50%",
                padding: "8px",
                boxShadow: `0 0 0 2px ${outlineColor}`,
                zIndex: 2,
              }}
              onClick={() =>
                setActiveIdx(idx === activeIdx ? null : idx)
              }
              aria-label={`Open popup for ${iconKey}`}
            >
              <img src={src} alt={iconKey} />
              {activeIdx === idx && (
                <Popup iconKey={iconKey} score={score} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default UMLEllipse;
