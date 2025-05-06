import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../authentication/Login";
import LoginButton from "../common/LoginButton"; // Import the LoginButton component
import "../../styles/common.css"; // Import the common CSS file
import { AuthContext } from "../../context/AuthContext"; // Importer le contexte
import homeBackground from "../../assets/hero_home.png";
import logo from '../../assets/logo_v1.png';

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
      <img src={logo} alt="Logo" className="logo" />
        <h1 className="title">MyPortfolio</h1>
        <LoginButton 
          onLoginClick={() => toggleLoginModal(true)} 
          onLogoutClick={() => handleAuthChange(false)} 
        />
      </nav>

      {/* Fullscreen hero section with overlay */}
      <section className="hero-section">
        <img src={homeBackground} alt="Background" className="hero-background" />
        <div className="hero-overlay">
          <h2>Créer votre portfolio</h2>
        </div>
      </section>

      {showLogin && (
        <div
          className="login-container"
          onClick={(e) => 
          e.target.classList.contains("login-container") && toggleLoginModal(false)}>
          <div className="login-box" onClick={(e) => e.stopPropagation()}>
            <Login
              onLoginSuccess={() => {
                handleAuthChange(true);
                toggleLoginModal(false);
                navigate("/dashboard");
              }}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;