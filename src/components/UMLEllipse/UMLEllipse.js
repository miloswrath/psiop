import React, { useState } from "react";
import "./LabeledEllipse.css";
import { lighten } from "polished";
import svgMap from "./svgMap.json";

const REGION_COUNT = {
  upper: 2,
  middle: 3,
  lower: 4,
};

const LabeledEllipse = ({ region = "middle", width = "100%", borderColor = "#000", label }) => {
  const backgroundColor =
    borderColor === "red" ? lighten(0.41, borderColor) : lighten(0.61, borderColor);

  const count = REGION_COUNT[region] || 0;
  const icons = svgMap[region]?.slice(0, count) || [];

  const angleStep = (Math.PI * 2) / count;
  const [activeIdx, setActiveIdx] = useState(null);

  return (
    <div className="ellipse-wrapper" style={{ width }}>
      <div
        className="ellipse"
        style={{
          borderColor,
          backgroundColor,
        }}
      >
        {label && <span className="ellipse-label">{label}</span>}
        {icons.map((src, idx) => {
          const angle = angleStep * idx - Math.PI / 2;
          const x = 50 + 45 * Math.cos(angle); // Center is 50%, radius is 45%
          const y = 50 + 45 * Math.sin(angle);

          return (
            <button
              key={idx}
              className="ellipse-icon-button"
              style={{ top: `${y}%`, left: `${x}%` }}
              onClick={() => setActiveIdx(idx === activeIdx ? null : idx)}
              aria-label={`Open popup for icon ${idx}`}
            >
              <img src={src} alt={`icon-${idx}`} />
              {activeIdx === idx && (
                <div className="popup">
                  Hello world
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LabeledEllipse;
