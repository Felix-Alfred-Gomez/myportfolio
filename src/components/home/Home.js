import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../authentication/Login";
import LoginButton from "./LoginButton"; // Import the LoginButton component
import "./Home.css";
import "../../styles/common.css"; // Import the common CSS file
import { AuthContext } from "../../context/AuthContext"; // Importer le contexte

function Home() {
  // Import variables
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  // State to track hover status
  const [isHovered, setIsHovered] = useState(false);

  // Fonction to modify the authentication state
  const handleAuthChange = (status) => {
    setIsAuthenticated(status);
    if (!status) console.log("User logged out");
  };

  // Function to modify the showLogin state and display/hide the login modal
  const toggleLoginModal = (state) => setShowLogin(state);

  // Function to trigger the dashboard button click
  // If the user is authenticated, navigate to the dashboard, otherwise show the login modal
  const handleDashboardClick = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      toggleLoginModal(true);
    }
  };

  return (
    <div className="container">
      <div className="top-banner">
        <h1 className="title">MyPortfolio</h1>
        <div className="buttons-group">
          <button
            className={`button ${isHovered ? "hovered" : ""}`}
            onClick={handleDashboardClick}
            onMouseEnter={() => setIsHovered(true)} // Inline hover logic
            onMouseLeave={() => setIsHovered(false)} // Inline hover logic
          >
            Dashboard
          </button>
          <LoginButton
            onLoginClick={() => toggleLoginModal(true)}
            onLogoutClick={() => handleAuthChange(false)}
          />
        </div>
      </div>

      {showLogin && (
        <div className="login-modal" onClick={(e) => e.target.classList.contains("login-modal") && toggleLoginModal(false)}>
          <div className="login-modal-content no-background">
            <Login onLoginSuccess={() => { handleAuthChange(true); toggleLoginModal(false); }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;