import React, { useState, useRef, useEffect } from "react";
import "./UMLEllipse.css";
import Popup from "../Popup/Popup";
import { lighten } from "polished";
import svgMap from "./svgMap.json";

const svgRequire = require.context("../../assets/svgs", true, /\.svg$/);

const UMLEllipse = ({ region = "middle", width = "100%", borderColor = "#000", label }) => {
  const backgroundColor =
    borderColor === "red" ? lighten(0.41, borderColor) : lighten(0.61, borderColor);

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
      const padding = 2; // px cutout space
      const centerToEdge = diameter / 2;
      const desiredRadius = centerToEdge - (iconSize / 2 + padding);
      const percent = (desiredRadius / centerToEdge) * 50; // convert to %
      setRadiusPercent(percent);
    }
  }, []);

  return (
    <div className="ellipse-wrapper" style={{ width }}>
      <div
        className="ellipse"
        ref={ellipseRef}
        style={{ borderColor, backgroundColor }}
      >
        {label && <span className="ellipse-label">{label}</span>}
        {icons.map((src, idx) => {
          const angle = angleStep * idx - Math.PI / 2;
          const x = 50 + radiusPercent * Math.cos(angle);
          const y = 50 + radiusPercent * Math.sin(angle);
          return (
            <button
              key={idx}
              className="ellipse-icon-button"
              style={{ top: `${y}%`, left: `${x}%` }}
              onClick={() => setActiveIdx(idx === activeIdx ? null : idx)}
              aria-label={`Open popup for icon ${idx}`}
            >
              <img src={src} alt={`icon-${idx}`} />
              {activeIdx === idx && <div className="popup">Hello world</div>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default UMLEllipse;
