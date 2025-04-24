import React from "react";
import "./InstructionBox.css";

const InstructionBox = ({ text }) => {
  return (
    <div className="instruction-box">
      {text}
    </div>
  );
};

export default InstructionBox;
