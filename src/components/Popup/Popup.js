import React from "react";
import "./Popup.css";
import popupContent from "./popupContent.json";

const Popup = ({ iconKey, score, data }) => {
  const contentList = (data ?? popupContent)?.[iconKey] || [];
  const isGood = score >= 70;
  const message = contentList[isGood ? 0 : 1] || "No information available.";
  const renderedMessage = message.replace(/\{\{score\}\}/g, score ?? "");
  const popupWidth = 250; // or use getBoundingClientRect()
  const margin = 10;

  return (
    <div

      className="popup-box"
      style={{
        width: "240px",
        position: "fixed", // or "absolute" depending on your layout
        transform: "translateX(0)", // remove -50% shift if near edge
        padding: "10px"
      }}
    >
      <p style={{ fontSize: "20px", lineHeight: "1.4", margin: 10 }}>
        {renderedMessage}
      </p>
    </div>
  );
};

export default Popup;
