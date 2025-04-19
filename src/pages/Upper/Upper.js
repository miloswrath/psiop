import React from "react";
import UMLEllipse from "../../components/UMLEllipse/UMLEllipse";
import Banner from "../../components/Banner/Banner";
import Graph from "../../components/Graph/Graph";
import TextBox from "../../components/Textbox/Textbox"
import "./Upper.css";

function Upper() {

  return (

    <div className="upper-container" >
    <Banner />

      <div className="upper-content" >
      
      <div className="split-layout">
        <div className="left-pane">
        <UMLEllipse
          region="upper"
          width="700px"
          borderColor="transparent"
          scores={[80, 30, 65, 90]} // Top = green, left = red, bottom = yellow, right = green
        />
        </div>
        <div className="right-pane">
          {/* Add future content here */}
          <Graph className="graph" percentage={69} size="900px" />
          <TextBox size="900px" text=
          {`This section focuses on factors related to brain health and cognitive aging. Quality sleep and educational background contribute to cognitive resilience, while cognition scores reflect current mental performance. WMH (white matter hyperintensities), captured via MRI, indicate structural changes in the brain that may be associated with aging or vascular risk. Together, these variables provide a deeper look into brain function and long-term cognitive well-being.`} 
           />
        </div>
      </div>
      
      </div>

    </div>

      
  );





} 


export default Upper;
