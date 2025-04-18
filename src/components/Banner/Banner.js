import React from "react";
import './Banner.css';

import { ReactComponent as IconSvg } from "../../assets/svgs/icon.svg";
import waffle from "../../assets/svgs/waffle.svg"; // ✅ Import as image



const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="navigation">
      <div className="navigationBackground" />

      {/* Top-left icon */}
      <IconSvg className="topLeftIcon" />

      <div className="buttonWrapper">
        <div className="circleButton">

          <img src={waffle} alt="Waffle Icon" className="waffleOverlay" /> {/* ✅ Fixed */}



        </div>
      </div>

      <div className="navButtons">
        <button className="navButton" onClick={() => navigate('/')}>Home</button>
        <button className="navButton">About</button>
        <button className="navButton">Education</button>
      </div>
    </div>
  );
};

export default Banner;
