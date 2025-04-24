import React, { useContext } from "react";
import UMLEllipse from "../../components/UMLEllipse/UMLEllipse";
import Banner from "../../components/Banner/Banner";
import Graph from "../../components/Graph/Graph";
import TextBox from "../../components/Textbox/Textbox"
import "./Lower.css";
import { OutputContext } from "../../App"; // adjust path if needed
import InstructionBox from "../../components/Instructions/InstructionBox";

function Lower() {

  const lowerKeys = ['sex', 'smoke', 'meta_entropy', 'exercise'];
  const outputData = useContext(OutputContext);

  const getLowerValues = () => {
    const result = {};
    for (const key of lowerKeys) {
      result[key] = outputData.data[key];
    }
    console.log({ result });
    return result;
  };

  const mean = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

  const lower_mean = mean(lowerKeys.map(k => outputData.data[k] ?? 0));
  console.log({lower_mean});
  const lowerValues = getLowerValues();
  return (

    <div className="lower-container" >
    <Banner />

    <InstructionBox text="This section focuses on lifestyle data including physical activity, metabolic patterns, and sex-specific indicators." />

    <div className="lower-content" >
      <div className="split-layout">
        <div className="left-pane">
          <UMLEllipse
            region="lower"
            width="700px"
            borderColor="transparent"
            scores={lowerValues}
          />
        </div>
        <div className="right-pane">
          <Graph className="graph" percentage={lower_mean} size="900px" />
          <TextBox size="900px" text={`This overview highlights how lifestyle and demographic factors—like sex, smoking, physical activity, and your 24-hour activity cycles—affect long-term health. While some risks are biological, healthy habits like regular exercise can help reduce negative outcomes and support overall well-being.`} />
        </div>
      </div>
    </div>
</div>

      
  );
} 


export default Lower;
