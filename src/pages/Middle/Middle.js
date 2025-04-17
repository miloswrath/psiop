import React from "react";
import UMLEllipse from "../../components/UMLEllipse/UMLEllipse";
import Banner from "../../components/Banner/Banner";
import "./Middle.css";
import Graph from "../../components/Graph/Graph";

function Middle() {
    return (
      <div className="middle-container">
        <Banner />
  
        <div className="middle-content">
          <UMLEllipse region="middle" width="250px" borderColor="red" />
  
          <div className="health-wrapper">
            <Graph percentage={50} /> {/* You can adjust this value */}
          </div>
        </div>
      </div>
    );
  }
  
  export default Middle;
