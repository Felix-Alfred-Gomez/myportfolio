import {React, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; // Importer le contexte
import "../../styles/common.css"; // Import the common CSS file

function LoginButton({ onLoginClick, onLogoutClick }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    onLogoutClick(); // Trigger the logout function
    navigate("/"); // Redirect to the home page
  };

  const handleLogin = () => {
    onLoginClick(); // Trigger the logout function
    navigate("/dashboard"); // Redirect to the home page
  };

  return isAuthenticated ? (
    <button 
    className="connect_button"
    onClick={handleLogout}>
      Se Déconnecter
    </button>
  ) : (
    <button 
    className="connect_button"
    onClick={handleLogin}>
      Se Connecter
    </button>
  );
}

export default LoginButton;