import React from "react";
import { lighten } from "polished"; // Assuming you're using polished
import "./Ellipse.css";

const Ellipse = ({ width = "100%", borderColor = "#122545", label, number }) => {
  const backgroundColor =
    borderColor === "red" ? lighten(0.41, borderColor) : lighten(0.61, borderColor);

  return (
    <div
      className="ellipse"
      style={{
        width,
        borderColor,
        backgroundColor,
      }}
    >
      <div className="ellipse-content">
        {number !== undefined && <div className="ellipse-number">{number}</div>}
        {label && <div className="ellipse-label">{label}</div>}
      </div>
    </div>
  );
};

export default Ellipse;
