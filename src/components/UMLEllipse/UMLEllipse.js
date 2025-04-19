import React, { useState, useRef, useEffect } from "react";
import "./UMLEllipse.css";
import Popup from "../Popup/Popup";
import svgMap from "./svgMap.json";

const svgRequire = require.context("../../assets/svgs", true, /\.svg$/);

const UMLEllipse = ({ region = "middle", width = "100%", borderColor = "#000", label, scores = [] }) => {
  const filenames = svgMap[region] || [];

  const icons = filenames
    .map((name) => {
      try {
        return svgRequire(`./${name}`);
      } catch (err) {
        console.error(`SVG not found: ${name}`);
        return null;
      }
    })
    .filter(Boolean);

  const count = icons.length;
  const angleStep = (Math.PI * 2) / count;
  const [activeIdx, setActiveIdx] = useState(null);

  // Dynamically determine radius based on icon size and wrapper
  const ellipseRef = useRef(null);
  const [radiusPercent, setRadiusPercent] = useState(45); // default fallback

  useEffect(() => {
    if (ellipseRef.current) {
      const diameter = ellipseRef.current.offsetWidth;
      const iconSize = 36; // px size of icon button
      const centerToEdge = diameter / 2;
      const desiredRadius = centerToEdge + iconSize * 0.25;
      const percent = (desiredRadius / centerToEdge) * 50; // convert to %
      setRadiusPercent(percent);
    }
  }, []);

  const getColorFromScore = (score) => {
    if (score >= 70) return "#66cc66";    // soft green
    if (score >= 40) return "#ffd700";    // soft yellow
    return "#ff6666";                     // soft red
  };
  
  
  

  const gradientStops = icons.map((_, idx) => {
    const angle = angleStep * idx - Math.PI / 2;
    const x = 50 + 50 * Math.cos(angle);
    const y = 50 + 50 * Math.sin(angle);
    const color = getColorFromScore(scores[idx] ?? 70);
    return `radial-gradient(circle at ${x}% ${y}%, ${color} 30%, transparent 70%)`;
  });

  const backgroundStyle = {
    backgroundImage: gradientStops.reverse().join(", ")
  };

  return (
    <div className="ellipse-wrapper" style={{ width }}>
      <div
        className="ellipse"
        ref={ellipseRef}
        style={{ border: "none", ...backgroundStyle }}
      >
        {label && <span className="ellipse-label">{label}</span>}
        <span className="ellipse-score">score</span>
        {icons.map((src, idx) => {
          const angle = angleStep * idx - Math.PI / 2;
          const x = 50 + radiusPercent * Math.cos(angle);
          const y = 50 + radiusPercent * Math.sin(angle);
          const iconName = filenames[idx].replace(".svg", "");
          const bgColor = getColorFromScore(scores[idx] ?? 70);
          return (
            
            <button
              key={idx}
              className="ellipse-icon-button"
              style={{
                top: `${y}%`,
                left: `${x}%`,
                backgroundColor: "white", // base layer (like a hole punch)
                borderRadius: "50%",
                padding: "8px",
                boxShadow: `0 0 0 2px ${bgColor}`, // outline with the score color
                zIndex: 2
              }}                          
              onClick={() => setActiveIdx(idx === activeIdx ? null : idx)}
              aria-label={`Open popup for icon ${idx}`}
            >
              <img src={src} alt={`icon-${idx}`} />
              {activeIdx === idx && (
                <Popup
                  iconKey={iconName}
                  score={scores[idx] ?? 75}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default UMLEllipse;
