
import React, { useContext } from "react";
import Banner from "../../components/Banner/Banner";
import Human from "../../components/Human/Human";
import Ellipse from "../../components/Ellipse/Ellipse";
import "./Home.css";
import { OutputContext } from "../../App"; // adjust path if needed


function Home() {
  const { data, setRandomId } = useContext(OutputContext);

  
  const upperKeys = ['sleep', 'cognition', 'WMH', 'education'];
  const middleKeys = ['diabetes', 'heart_disease', 'hypertension', 'cholesterol'];
  const lowerKeys = ['sex', 'smoke', 'meta_entropy', 'exercise'];
  const mean = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

  const avgRegion = {
    upper: mean(upperKeys.map(k => data[k] ?? 0)),
    middle: mean(middleKeys.map(k => data[k] ?? 0)),
    lower: mean(lowerKeys.map(k => data[k] ?? 0)),
    latent: data.latent ?? 0
  };

  console.log("Region Means:", avgRegion);

  const getColor = (value) => value < 50 ? 'red' : 'green';

  const dotData = [
    { id: "head", x: "46.5%", y: "5%", color: getColor(avgRegion.upper), to: "/upper" },
    { id: "torso", x: "47%", y: "25%", color: getColor(avgRegion.middle), to: "/middle" },
    { id: "waist", x: "47%", y: "47%", color: getColor(avgRegion.lower), to: "/lower" },
  ];

  return (
    <div className="home-container">
      {/* Top Banner */}
      <Banner />

      {/* Main content with a divider */}
      <div className="home-content">
        {/* Left section */}
        <div className="left-section">
          <Human dotData={dotData} />
        </div>

        {/* Vertical divider */}
        <div className="divider" />

        {/* Right section with circles */}
        <div className="right-section">
          <div className="ellipseStack">
            <Ellipse width="300px" label="Overall Score" number={avgRegion.latent} />
            <div className="ellipseDivider">
              <Ellipse width="250px" borderColor={getColor(avgRegion.upper)} label="Cognition" number={avgRegion.upper} />
              <Ellipse width="250px" borderColor={getColor(avgRegion.middle)} label="Cardio" number={avgRegion.middle} />
              <Ellipse width="250px" borderColor={getColor(avgRegion.lower)} label="Lifestyle" number={avgRegion.lower} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
