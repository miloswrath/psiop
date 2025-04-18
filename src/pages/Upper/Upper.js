import React from "react";
import UMLEllipse from "../../components/UMLEllipse/UMLEllipse";
import Banner from "../../components/Banner/Banner";
import "./Upper.css";

function Upper() {

  return (

    <div className="upper-container" >
    <Banner />

      <div className="upper-content" >
      
      <div className="split-layout">
        <div className="left-pane">
          <UMLEllipse region="upper" width="700px" borderColor="red" />
        </div>
        <div className="right-pane">
          {/* Add future content here */}
        </div>
      </div>
      
      </div>

    </div>

      
  );





} 


export default Upper;
