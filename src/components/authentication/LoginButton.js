import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginButton.css"; // Import the CSS file

function LoginButton({ isAuthenticated, onLoginClick, onLogoutClick }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogoutClick(); // Trigger the logout function
    navigate("/"); // Redirect to the home page
  };

  return isAuthenticated ? (
    <button className="home-logout-button" onClick={handleLogout}>
      Se Déconnecter
    </button>
  ) : (
    <button className="home-login-button" onClick={onLoginClick}>
      Se Connecter
    </button>
  );
}

export default LoginButton;