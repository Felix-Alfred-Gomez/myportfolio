import { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/common.css";
import logoConnection from "../../assets/connection_logo.png";
import ParametresModal from "./ParametresModal";

function LoginLogo({ onLoginClick, onLogoutClick }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showParametresModal, setShowParametresModal] = useState(false);
  const menuRef = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    if (!showMenu) return;
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const handleLogout = () => {
    onLogoutClick();
    setShowLogoutModal(false);
    setShowMenu(false);
    navigate("/");
  };

  const handleLogin = () => {
    onLoginClick();
    navigate("/dashboard");
  };

  const handleSettings = () => {
    setShowMenu(false);
    setShowParametresModal(true);
  };

  return isAuthenticated ? (
    <>
      <button className="connect_button" onClick={() => setShowMenu((v) => !v)}>
        <img
          src={logoConnection}
          alt="User menu"
          className="connect_button_image"
        />
      </button>
      {showMenu && (
        <div className="popup_menu" ref={menuRef}>
          <ul className="logout_menu">
            <li className="logout_menu_item" onClick={handleSettings}>
              Paramètres
            </li>
            <li
              className="logout_menu_item"
              onClick={() => {
                setShowMenu(false);
                setShowLogoutModal(true);
              }}
            >
              Se déconnecter
            </li>
          </ul>
        </div>
      )}
      <ParametresModal show={showParametresModal} onClose={() => setShowParametresModal(false)} />
      {showLogoutModal && (
        <div className="modal-overlay grey">
          <div className="modal-template">
            <h2>Déconnexion</h2>
            <p>Voulez-vous vous déconnecter ?</p>
            <button onClick={handleLogout}>Se déconnecter</button>
            <button onClick={() => setShowLogoutModal(false)}>Annuler</button>
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

export default LoginLogo;