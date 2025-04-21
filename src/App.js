import React, { createContext, useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import outputData from './output.json';

import Home from "./pages/Home/Home";
import Middle from "./pages/Middle/Middle";
import Upper from "./pages/Upper/Upper";
import Lower from "./pages/Lower/Lower";

function getRegionMeans(data) {
  const upperKeys = ['sleep', 'cognition', 'WMH', 'education'];
  const middleKeys = ['diabetes', 'heart_disease', 'hypertension', 'cholesterol'];
  const lowerKeys = ['sex', 'smoke', 'meta_entropy', 'exercise'];

  const mean = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

  return Object.entries(data).reduce((acc, [id, entry]) => {
    acc[id] = {
      upper: mean(upperKeys.map(k => entry[k] ?? 0)),
      middle: mean(middleKeys.map(k => entry[k] ?? 0)),
      lower: mean(lowerKeys.map(k => entry[k] ?? 0)),
    };
    return acc;
  }, {});
}
export const OutputContext = createContext();

function App() {
  const [currentId, setCurrentId] = useState(() => {
    const keys = Object.keys(outputData);
    return keys[Math.floor(Math.random() * keys.length)];
  });

  const contextValue = useMemo(() => ({
    data: outputData[currentId],
    id: currentId,
    setRandomId: () => {
      const keys = Object.keys(outputData);
      const newId = keys[Math.floor(Math.random() * keys.length)];
      const entry = outputData[newId];

      // Mean calculations
      const mean = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
      const upperKeys = ['sleep', 'cognition', 'WMH', 'education'];
      const middleKeys = ['diabetes', 'heart_disease', 'hypertension', 'cholesterol'];
      const lowerKeys = ['sex', 'smoke', 'meta_entropy', 'exercise'];

      const upper = mean(upperKeys.map(k => entry[k] ?? 0));
      const middle = mean(middleKeys.map(k => entry[k] ?? 0));
      const lower = mean(lowerKeys.map(k => entry[k] ?? 0));

      console.log("Random ID selected:", newId);
      console.log("Means — Upper:", upper.toFixed(2), "| Middle:", middle.toFixed(2), "| Lower:", lower.toFixed(2));

      setCurrentId(newId);
    }
  }), [currentId]);

  return (
    <OutputContext.Provider value={contextValue}>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upper" element={<Upper />} />
            <Route path="/middle" element={<Middle />} />
            <Route path="/lower" element={<Lower />} />
          </Routes>
        </div>
      </Router>
    </OutputContext.Provider>
  );
}

export default App;
