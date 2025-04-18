import React from "react";
import UMLEllipse from "../../components/UMLEllipse/UMLEllipse";
import Banner from "../../components/Banner/Banner";
import Graph from "../../components/Graph/Graph";
import TextBox from "../../components/Textbox/Textbox"
import "./Lower.css";

function Lower() {

  return (

    <div className="lower-container" >
    <Banner />

      <div className="lower-content" >
      
      <div className="split-layout">
        <div className="left-pane">
          <UMLEllipse region="lower" width="700px" borderColor="red" />
        </div>
        <div className="right-pane">
          {/* Add future content here */}
          <Graph className="graph" percentage={69} size="900px" />
          <TextBox size="900px" text=
          {`This is line one.
this is line two.
and here's line three with more detail.`} 
           />
        </div>
      </div>
      
      </div>

    </div>

      
  );





} 


export default Lower;
