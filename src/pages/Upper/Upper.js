import React, { useContext } from "react";
import UMLEllipse from "../../components/UMLEllipse/UMLEllipse";
import Banner from "../../components/Banner/Banner";
import Graph from "../../components/Graph/Graph";
import TextBox from "../../components/Textbox/Textbox";
import InstructionBox from "../../components/Instructions/InstructionBox";
import { OutputContext } from "../../App";
import "./Upper.css";

function Upper() {
  const upperKeys = ['sleep', 'cognition', 'WMH', 'education'];
  const outputData = useContext(OutputContext);

  const getUpperValues = () => {
    const result = {};
    for (const key of upperKeys) {
      result[key] = outputData.data[key];
    }
    return result;
  };

  const mean = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
  const upper_mean = mean(upperKeys.map(k => outputData.data[k] ?? 0));
  const upperValues = getUpperValues();

  return (
    <div className="home-container">
      <Banner />
      <div className="home-content">
        <div className="left-section">
          <InstructionBox text="This section shows health scores for cognitive functions like sleep quality, education, and white matter health." />
          <UMLEllipse
            region="upper"
            width="700px"
            borderColor="transparent"
            scores={upperValues}
          />
        </div>

        <div className="divider" />

        <div className="right-section">
          <h2 className="header">Cognitive and Neurological Overview</h2>
          <Graph className="graph" percentage={upper_mean} size="900px" />
          <TextBox
            size="700px"
            text={`This section is about your brain and how it changes as you get older. Getting good sleep and having more education can help keep your brain healthy over time.`}
            results={upperValues}
          />
        </div>
      </div>
    </div>
  );
}

export default Upper;
