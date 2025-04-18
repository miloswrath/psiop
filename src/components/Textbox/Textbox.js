import React from "react";
import "./Textbox.css";

const TextBox = ({ text, size = "250px" }) => {
  return (
    <div className="textbox" style={{ width: size }}>
      {text}
    </div>
  );
};

export default TextBox;
