import React from "react";
import "./Popup.css";

const Popup = ({ iconKey, score, data }) => {
  const contentList = data?.[iconKey] || [];
  const isGood = score >= 70; // threshold can be adjusted
  const message = contentList[isGood ? 0 : 1] || "No information available.";

  const renderedMessage = message.replace(/\{\{score\}\}/g, score);

  return (
    <div className="popup-box">
      <p>{renderedMessage}</p>
    </div>
  );
};

export default Popup;
