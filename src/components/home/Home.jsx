import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "../authentication/LoginModal";
import Register from "../authentication/RegisterModal"; // Add this import
import LoginLogo from "../common/LoginLogo"; // Import the LoginButton component
import WebsiteLogo from "../common/WebsiteLogo"; // Import the LogoButton component
import "../../styles/common.css"; // Import the common CSS file
import { AuthContext } from "../../context/AuthContext"; // Importer le contexte
import homeBackground from "../../assets/hero_home.png";
import { getAuth, signOut } from "firebase/auth";
import ForgotPasswordModal from "../authentication/ForgotPasswordModal"; // Add this import
import EmailVerification from "../authentication/EmailVerificationModal"; // Import the EmailVerification modal

function Home() {
  // Import variables
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false); // Add this state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false); // Add state for email verification modal
  const navigate = useNavigate();

  // Fonction to modify the authentication state
  const handleAuthChange = async (status) => {
    if (!status) {
      const auth = getAuth();
      await signOut(auth);
      console.log("User logged out");
    }
    setIsAuthenticated(status);
  };

  const navigatetodashbboard = () => {
    if (isAuthenticated) {
      navigate(`/dashboard`);
    } else {
        setShowLogin(true); // Show the login modal;
        if (isAuthenticated) {navigate(`/dashboard`);}
    }
  };

  return (
    <div className="container">
      <nav className="nav-site">
        <WebsiteLogo />
        <LoginLogo 
          onLoginClick={() => setShowLogin(true)} 
          onLogoutClick={() => handleAuthChange(false)} />
      </nav>

      {/* Fullscreen hero section with overlay */}
      <section className="hero-section">
        <img src={homeBackground} alt="Background" className="hero-background" />
        <div className="hero-overlay">
          <h2>Créer votre Portfolio</h2>
          <button
            className="button-pulse"
            onClick={navigatetodashbboard}>
            Commencer
          </button>
        </div>
      </section>

      {showLogin && (
        <div
          className="login-container"
          onClick={(e) => 
            e.target.classList.contains("login-container") && setShowLogin(false)}>
          <div className="login-box" onClick={(e) => e.stopPropagation()}>
            <LoginModal
              onLoginSuccess={() => {
                handleAuthChange(true);
                setShowLogin(false);
                navigate("/dashboard");
              }}
              onRegisterClick={() => {
                setShowLogin(false);
                setShowRegister(true);
              }}
              onForgotPasswordClick={() => {
                setShowLogin(false);
                setShowForgotModal(true); // Show forgot password modal
              }}
            />
          </div>
        </div>
      )}

      {showRegister && (
        <div
          className="login-container"
          onClick={(e) =>
            e.target.classList.contains("login-container") && setShowRegister(false)}>
          <div className="login-box" onClick={(e) => e.stopPropagation()}>
            <Register
              onRegisterSuccess={() => {
                setShowRegister(false);
                setShowEmailVerification(true); // Show email verification modal after registration
              }}
            />
          </div>
        </div>
      )}

      {showForgotModal && (
        <div
          className="login-container"
          onClick={(e) =>
            e.target.classList.contains("login-container") && setShowForgotModal(false)}>
          <div className="login-box" onClick={(e) => e.stopPropagation()}>
            <ForgotPasswordModal/>
          </div>
        </div>
      )}

      {showEmailVerification && (
        <div
          className="login-container"
          onClick={(e) =>
            e.target.classList.contains("login-container") && setShowEmailVerification(false)}>
          <div className="login-box" onClick={(e) => e.stopPropagation()}>
            <EmailVerification onClose={() => setShowEmailVerification(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;