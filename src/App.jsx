import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Modal from "./components/Modal";
import PrivateRoute from "./components/PrivateRoutes";
import ProjectModal from "./components/project/ProjectModal";
import PublicRoute from "./components/PublicRoute";
import useAuthCheck from "./hooks/useAuthCheck";
import Login from "./pages/Login.jsx";
import Projects from "./pages/Projects.jsx";
import Teams from "./pages/Teams.jsx";

export default function App() {
  const { isTeamModalOpen, isProjectModalOpen } = useSelector(
    (state) => state.modal
  );
  const authCheck = useAuthCheck();
  return (
    <>
      {authCheck ? (
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/teams"
              element={
                <PrivateRoute>
                  <Teams />
                </PrivateRoute>
              }
            />
            <Route
              path="/projects"
              element={
                <PrivateRoute>
                  <Projects />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      ) : (
        <div>Checking Authentication...</div>
      )}

      {isTeamModalOpen && <Modal />}
      {isProjectModalOpen && <ProjectModal />}
    </>
  );
}
