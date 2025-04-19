import React from "react";
import "./Popup.css";
import popupContent from "./popupContent.json";

const Popup = ({ iconKey, score, data }) => {
  const contentList = (data ?? popupContent)?.[iconKey] || [];
  const isGood = score >= 70;
  const message = contentList[isGood ? 0 : 1] || "No information available.";
  const renderedMessage = message.replace(/\{\{score\}\}/g, score ?? "");

  return (
    <div className="popup-box" style={{ width: "240px" }}>
      <p style={{ fontSize: "20px", lineHeight: "1.4" }}>{renderedMessage}</p>
    </div>
  );
};

export default Popup;
