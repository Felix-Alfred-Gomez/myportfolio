import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import "./Home.css";

function Home({ isAuthenticated, onLoginSuccess, onLogout }) {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleLogoutClick = () => {
    onLogout(); // Trigger the logout function
  };

  const handleCloseLogin = (e) => {
    if (e.target.classList.contains("login-modal")) {
      setShowLogin(false);
    }
  };

  const handleLoginSuccess = () => {
    onLoginSuccess();
    setShowLogin(false); // Close the login modal after successful login
    navigate("/dashboard"); // Redirect to the dashboard after login
  };

  const handleDashboardClick = () => {
    if (isAuthenticated) {
      navigate("/dashboard"); // Redirect to the dashboard if authenticated
    } else {
      setShowLogin(true); // Open the login modal if not authenticated
    }
  };

  return (
    <div className="home-container">
      <div className="home-banner">
        <h1 className="home-title">MyPortfolio</h1>
        <div className="home-buttons">
          <button className="home-dashboard-button" onClick={handleDashboardClick}>
            Dashboard
          </button>
          {isAuthenticated ? (
            <button className="home-logout-button" onClick={handleLogoutClick}>
              Se Déconnecter
            </button>
          ) : (
            <button className="home-login-button" onClick={handleLoginClick}>
              Se Connecter
            </button>
          )}
        </div>
      </div>
      {showLogin && (
        <div className="login-modal" onClick={handleCloseLogin}>
          <div className="login-modal-content no-background">
            <Login onLoginSuccess={handleLoginSuccess} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;