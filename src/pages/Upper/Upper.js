import React from "react";
import UMLEllipse from "../../components/UMLEllipse/UMLEllipse";
import Banner from "../../components/Banner/Banner";
import "./Upper.css";

function Upper() {

  return (

    <div className="upper-container" >
    <Banner />

      <div className="upper-content" >

      <UMLEllipse region="upper" width="250px" borderColor="red" />
      
      </div>

    </div>

      
  );





} 


export default Upper;
