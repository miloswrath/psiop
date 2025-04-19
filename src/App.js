import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Home from "./pages/Home/Home";
import Middle from "./pages/Middle/Middle";
import Upper from "./pages/Upper/Upper";
import Lower from "./pages/Lower/Lower";

function App() {
  return (

    <Router>
      <div className="app">
      <Routes>
        <Route path = "/" element={<Home />} />
        <Route path="/upper" element={<Upper />} />
        <Route path="/middle" element={<Middle />} />
        <Route path="/lower" element={<Lower />} />
      </Routes>
      </div>
    </Router>

  );
}

export default App;
