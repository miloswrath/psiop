import React from "react";
<<<<<<< HEAD

const TextBox = ({ text }) => {
  return (
    <div
      style={{
        padding: "10px 16px",
        borderRadius: "10px",
        backgroundColor: "#fffaf4", // ✅ matches the graph background
        color: "#333",
        fontWeight: "500",
        fontSize: "14px",
        width: "fit-content",
        maxWidth: "250px",
        wordWrap: "break-word",
        wordBreak: "break-word",
        whiteSpace: "normal",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        marginTop: "12px",
      }}
    >
=======
import "./Textbox.css";

const TextBox = ({ text, size = "250px" }) => {
  return (
    <div className="textbox" style={{ width: size }}>
>>>>>>> ba48f313bd2036a636e18d3736b39f587debe065
      {text}
    </div>
  );
};

export default TextBox;
