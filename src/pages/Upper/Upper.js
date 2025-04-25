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
<<<<<<< HEAD

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
            size="900px"
            text={`This section is about your brain and how it changes as you get older. Getting good sleep and having more education can help keep your brain strong. Your thinking score shows how well your brain is working right now. A brain scan can also show small changes in the brain that may happen with age or heart problems. All of this information helps give a better picture of your brain health over time.`}
          />
=======
  
      <InstructionBox text="Click on each of the icons to show your score with some basic information." />
  
      <div className="upper-content">
        <div className="split-layout">
          <div className="left-pane">
            <UMLEllipse
              region="upper"
              width="700px"
              borderColor="transparent"
              scores={upperValues}
            />
          </div>
          <div className="right-pane">
            <Graph className="graph" percentage={upper_mean} size="900px" />
            <TextBox
              size="900px"
              text={`This section is about your brain and how it changes as you get older. Getting good sleep and having more education can help keep your brain strong. Your thinking score shows how well your brain is working right now. A brain scan can also show small changes in the brain that may happen with age or heart problems. All of this information helps give a better picture of your brain health over time.`}
            />
          </div>
>>>>>>> eli
        </div>
      </div>
    </div>
  );
}

export default Upper;
