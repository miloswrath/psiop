import React, { useContext } from "react";
import UMLEllipse from "../../components/UMLEllipse/UMLEllipse";
import Banner from "../../components/Banner/Banner";
import Graph from "../../components/Graph/Graph";
import TextBox from "../../components/Textbox/Textbox"
import "./Middle.css";
import { OutputContext } from "../../App"; // adjust path if needed

function Middle() {

  const middleKeys = ['diabetes', 'heart_disease', 'hypertension', 'cholesterol'];
  const outputData = useContext(OutputContext);

  const getMiddleValues = () => {
    const result = {};
    for (const key of middleKeys) {
      result[key] = outputData.data[key];
    }
    console.log({ result });
    return result;
  };

  const mean = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

  const middle_mean = mean(middleKeys.map(k => outputData.data[k] ?? 0));
  console.log({middle_mean});
  const middleValues = getMiddleValues();
  return (

    <div className="middle-container" >
    <Banner />

      <div className="middle-content" >
      
      <div className="split-layout">
        <div className="left-pane">
          <UMLEllipse
            region="middle"
            width="700px"
            borderColor="transparent"
            scores={middleValues} // Top = green, left = red, bottom = yellow, right = green
          />
        </div>
        <div className="right-pane">
          {/* Add future content here */}
          <Graph className="graph" percentage={middle_mean} size="900px" />
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
