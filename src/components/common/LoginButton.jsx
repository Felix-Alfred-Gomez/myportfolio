import { React, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; // Importer le contexte
import "../../styles/common.css"; // Import the common CSS file
import logoConnection from "../../assets/connection_logo.png"; // Import the image

function LoginButton({ onLoginClick, onLogoutClick }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    onLogoutClick(); // Trigger the logout function
    navigate("/"); // Redirect to the home page
  };

  const handleLogin = () => {
    onLoginClick(); // Trigger the login function
    navigate("/dashboard"); // Redirect to the dashboard
  };

  return isAuthenticated ? (
    <button className="connect_button" onClick={handleLogout}>
      <img
        src={logoConnection}
        alt="Logout"
        className="connect_button_image"
      />
    </button>
  ) : (
    <button className="connect_button" onClick={handleLogin}>
      <img
        src={logoConnection}
        alt="Login"
        className="connect_button_image"
      />
    </button>
  );
}

export default LoginButton;