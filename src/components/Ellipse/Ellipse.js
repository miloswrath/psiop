import React from "react";
import "./Ellipse.css";
import { lighten } from "polished";

const Ellipse = ({ width = "100%", borderColor = "#000", label }) => {

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
      {label && <span className="ellipse-label">{label}</span>}
    </div>
  );
};

export default Ellipse;
