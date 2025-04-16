import React from "react";
import Banner from "../../components/Banner/Banner";
import Human from "../../components/Human/Human";
import Ellipse from "../../components/Ellipse/Ellipse";
import "./Home.css";

function Home() {
    const dotData = [
      { id: "head", x: "46.5%", y: "5%", color: "red", to: "/upper" },
      { id: "torso", x: "47%", y: "25%", color: "green", to: "/middle" },
      { id: "waist", x: "47%", y: "47%", color: "green", to: "/lower" },
    ];

  return (
    <div className="home-container">
      {/* Top Banner */}
      <Banner />

      {/* Main content with a divider */}
      <div className="home-content">
        {/* Left section */}
        <div className="left-section">
          <Human dotData = {dotData}/>
        </div>

        {/* Vertical divider (positioned absolutely) */}
        <div className="divider" />

        {/* Right section with circles */}
        <div className="right-section">
          <div className="ellipseStack">
            <Ellipse width="300px" label="Overall Score" />
            <div className="ellipseDivider">
              <Ellipse width="250px" borderColor="green" label="Cognition" />
              <Ellipse width="250px" borderColor="red" label="Cardio" />
              <Ellipse width="250px" borderColor="green" label="Lifestyle" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
