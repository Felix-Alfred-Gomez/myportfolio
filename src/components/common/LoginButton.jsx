import { React, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; // Import the context
import "../../styles/common.css"; // Import the common CSS file
import logoConnection from "../../assets/connection_logo.png"; // Import the image

function LoginButton({ onLoginClick, onLogoutClick }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [showPopup, setShowPopup] = useState(false);

  const handleLogout = () => {
    onLogoutClick(); // Trigger the logout function
    navigate("/"); // Redirect to the home page
  };

  const handleLogin = () => {
    onLoginClick(); // Trigger the login function
    navigate("/dashboard"); // Redirect to the dashboard
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return isAuthenticated ? (
    <>
      <button className="connect_button" onClick={togglePopup}>
        <img
          src={logoConnection}
          alt="Logout"
          className="connect_button_image"
        />
      </button>
      {showPopup && (
        <div
          className="popup_menu_container"
          onClick={(e) =>
            e.target.classList.contains("popup_menu_container") &&
            setShowPopup(false)
          }
        >
          <div className="popup_menu" onClick={(e) => e.stopPropagation()}>
            <ul className="logout_menu">
              <li className="logout_menu_item" onClick={handleLogout}>
                Se déconnecter
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
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