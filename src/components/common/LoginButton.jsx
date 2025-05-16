import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/common.css";
import logoConnection from "../../assets/connection_logo.png";

function LoginButton({ onLoginClick, onLogoutClick }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    onLogoutClick();
    setShowModal(false);
    navigate("/");
  };

  const handleLogin = () => {
    onLoginClick();
    navigate("/dashboard");
  };

  return isAuthenticated ? (
    <>
      <button className="connect_button" onClick={() => setShowModal(true)}>
        <img
          src={logoConnection}
          alt="Logout"
          className="connect_button_image"
        />
      </button>
      {showModal && (
        <>
          <div className="modal-template">
            <h2>Déconnexion</h2>
            <p>Voulez-vous vous déconnecter ?</p>
            <button onClick={handleLogout}>Se déconnecter</button>
            <button onClick={() => setShowModal(false)}>Annuler</button>
          </div>
          <div className="modal-overlay" onClick={() => setShowModal(false)} />
        </>
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