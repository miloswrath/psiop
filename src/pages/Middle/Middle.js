import React from "react";
import UMLEllipse from "../../components/UMLEllipse/UMLEllipse";
import Banner from "../../components/Banner/Banner";
import Graph from "../../components/Graph/Graph";
import Textbox from "../../components/Textbox/Textbox";
import "./Middle.css";

function Middle() {
  return (
    <div className="middle-container">
      <Banner />

      <div className="middle-content">
        <UMLEllipse region="middle" width="250px" borderColor="red" />

        <div className="health-wrapper">
          <Graph percentage={50} />

          {/* ✅ Add the text box here */}
          <Textbox text="Cognitive Status: Average" />
        </div>
      </div>
    </div>
  );
}

export default Middle;
