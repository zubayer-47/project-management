import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Teams from "./pages/Teams.jsx";
import Projects from "./pages/Projects.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </Router>
  );
}
