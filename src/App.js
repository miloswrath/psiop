import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Home from "./pages/Home/Home";
import Middle from "./pages/Middle/Middle";

function App() {
  return (

    <Router>
      <div className="app">
      <Routes>
        <Route path = "/" element={<Home />} />
        <Route path="/upper" element={<Upper />} />
      </Routes>
      </div>
    </Router>

  );
}

export default App;
