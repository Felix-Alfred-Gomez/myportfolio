import {React, useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; // Importer le contexte
import "../../styles/common.css"; // Import the common CSS file

function LoginButton({ onLoginClick, onLogoutClick }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  // State to track hover status
  const [isHovered, setIsHovered] = useState(false);

  const handleLogout = () => {
    onLogoutClick(); // Trigger the logout function
    navigate("/"); // Redirect to the home page
  };

  return isAuthenticated ? (
    <button 
    className={`button ${isHovered ? "hovered" : ""}`}
    onMouseEnter={() => setIsHovered(true)} // Inline hover logic
    onMouseLeave={() => setIsHovered(false)} // Inline hover logic
    onClick={handleLogout}>
      Se Déconnecter
    </button>
  ) : (
    <button 
    className={`button ${isHovered ? "hovered" : ""}`}
    onMouseEnter={() => setIsHovered(true)} // Inline hover logic
    onMouseLeave={() => setIsHovered(false)} // Inline hover logic
    onClick={onLoginClick}>
      Se Connecter
    </button>
  );
}

export default LoginButton;