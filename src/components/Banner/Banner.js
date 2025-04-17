import React from "react";
import './Banner.css';
import { ReactComponent as IconSvg } from "../../assets/svgs/icon.svg"; // or use an image file if needed
import WaffleIcon from "../../assets/svgs/waffle.svg"; // adjust path as needed

const Banner = () => {
  return (
    <div className="navigation">
      <div className="navigationBackground" />

      {/* Top-left icon */}
      <IconSvg className="topLeftIcon" />
      {/* If using PNG/JPG: <img src={iconPng} alt="Icon" className="topLeftIcon" /> */}

      <div className="buttonWrapper">
        <div className="circleButton">
        <img src={WaffleIcon} alt="Waffle Icon" className="waffleOverlay" />
        </div>
      </div>

      <div className="navButtons">
        <button className="navButton">Home</button>
        <button className="navButton">About</button>
        <button className="navButton">Education</button>
      </div>
    </div>
  );
};

export default Banner;

