import React, { useContext } from "react";
import UMLEllipse from "../../components/UMLEllipse/UMLEllipse";
import Banner from "../../components/Banner/Banner";
import Graph from "../../components/Graph/Graph";
import TextBox from "../../components/Textbox/Textbox"
import "./Upper.css";
import { OutputContext } from "../../App"; // adjust path if needed
import InstructionBox from "../../components/Instructions/InstructionBox";

function Upper() {
  const upperKeys = ['sleep', 'cognition', 'WMH', 'education'];
  const outputData = useContext(OutputContext);

  const getUpperValues = () => {
    const result = {};
    for (const key of upperKeys) {
      result[key] = outputData.data[key];
    }
    console.log({ result });
    return result;
  };

  const mean = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

  const upper_mean = mean(upperKeys.map(k => outputData.data[k] ?? 0));
  console.log({upper_mean});
  const upperValues = getUpperValues();
  return (
    <div className="upper-container">
      <Banner />
  
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
        </div>
      </div>
    </div>
  );  





} 


export default Upper;
