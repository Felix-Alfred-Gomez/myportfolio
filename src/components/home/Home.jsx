import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../authentication/Login";
import LoginButton from "../common/LoginButton"; // Import the LoginButton component
import "../../styles/Home.css";
import "../../styles/common.css"; // Import the common CSS file
import { AuthContext } from "../../context/AuthContext"; // Importer le contexte

function Home() {
  // Import variables
  const { setIsAuthenticated } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  // Fonction to modify the authentication state
  const handleAuthChange = (status) => {
    setIsAuthenticated(status);
    if (!status) console.log("User logged out");
  };

  // Function to modify the showLogin state and display/hide the login modal
  const toggleLoginModal = (state) => setShowLogin(state);

  return (
    <div className="container">
      <nav className="nav-site">
        <h1 className="title">MyPortfolio</h1>
        <LoginButton 
          onLoginClick={() => toggleLoginModal(true)} 
          onLogoutClick={() => handleAuthChange(false)} 
        />
      </nav>

      <div className="subtitle">
        <h2>Créer votre portfolio</h2>
      </div>

      {showLogin && (
        <div className="login-modal" onClick={(e) => e.target.classList.contains("login-modal") && toggleLoginModal(false)}>
          <div className="login-modal-content no-background">
            <Login onLoginSuccess={() => { handleAuthChange(true); toggleLoginModal(false); navigate("/dashboard"); }} />
          </div>
        </div>
      )}

      {showLogin && (
        <div className="login-modal" onClick={(e) => e.target.classList.contains("login-modal") && toggleLoginModal(false)}>
          <div className="login-modal-content no-background">
            <Login onLoginSuccess={() => { handleAuthChange(true); toggleLoginModal(false); navigate("/dashboard"); }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;