import React from "react";
import UMLEllipse from "../../components/UMLEllipse/UMLEllipse";
import Banner from "../../components/Banner/Banner";
import Graph from "../../components/Graph/Graph";
import TextBox from "../../components/Textbox/Textbox"
import "./Middle.css";

function Middle() {

  return (

    <div className="middle-container" >
    <Banner />

      <div className="middle-content" >
      
      <div className="split-layout">
        <div className="left-pane">
          <UMLEllipse region="middle" width="700px" borderColor="red" />
        </div>
        <div className="right-pane">
          {/* Add future content here */}
          <Graph className="graph" percentage={69} size="900px" />
          <TextBox size="900px" text=
          {`This section focuses on metabolic and cardiovascular health. Diabetes and high blood pressure are key risk factors that can impact heart function over time. Hypertension, often related to lifestyle and genetics, further contributes to cardiovascular strain. Combined with your heart disease risk, these measures offer a clear picture of your overall heart and circulatory health.`} 
           />
        </div>
      </div>
      
      </div>

    </div>

      
  );





} 


export default Middle;
