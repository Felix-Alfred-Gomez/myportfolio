import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import Register from "./RegisterModal"; // Add this import
import LoginLogo from "../common/LoginLogo"; // Import the LoginButton component
import WebsiteLogo from "../common/WebsiteLogo"; // Import the LogoButton component
import GitHubLogo from "../common/GitHubLogo"; // Import the GitHub logo component
import "../../styles/common.css"; // Import the common CSS file
import { AuthContext } from "../../context/AuthContext"; // Importer le contexte
import homeBackground from "../../assets/hero_home.png";
import { getAuth, signOut } from "firebase/auth";
import ForgotPasswordModal from "./ForgotPasswordModal"; // Add this import
import EmailVerification from "./EmailVerificationModal"; // Import the EmailVerification modal

function Home() {
  // Import variables
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false); // Add this state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false); // Add state for email verification modal
  const [registeredEmail, setRegisteredEmail] = useState(""); // Store the email for verification modal
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
      if (isAuthenticated) { navigate(`/dashboard`); }
    }
  };

  return (
    <div className="container">      {/* Fullscreen hero section with overlay */}      
      <nav className="nav-site">
        <WebsiteLogo />
        <LoginLogo
          onLoginClick={() => setShowLogin(true)}
          onLogoutClick={() => handleAuthChange(false)} />
      </nav>
      <section className="hero-section">
        <img src={homeBackground} alt="Background" className="hero-background" />          <div className="hero-overlay">
          <h2>Créer votre Portfolio</h2>
          <button
            className="button-pulse"
            onClick={navigatetodashbboard}>
            Commencer
          </button>
        </div>
      </section>

      {showLogin && (
        <div className="login-container">
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
                setShowForgotModal(true);
              }}
              onClose={() => setShowLogin(false)}
            />
          </div>
        </div>
      )}      {showRegister && (
        <div className="login-container">
          <div className="login-box" onClick={(e) => e.stopPropagation()}>
            <Register
              onRegisterSuccess={(email) => {
                setShowRegister(false);
                setRegisteredEmail(email);
                setShowEmailVerification(true);
              }}
              onClose={() => setShowRegister(false)}
            />
          </div>
        </div>
      )}

      {showForgotModal && (
        <div className="login-container">
          <div className="login-box" onClick={(e) => e.stopPropagation()}>
            <ForgotPasswordModal onClose={() => setShowForgotModal(false)} />
          </div>
        </div>
      )}      {showEmailVerification && (
        <div
          className="login-container"
          onClick={(e) =>
            e.target.classList.contains("login-container") && setShowEmailVerification(false)}>
          <div className="login-box" onClick={(e) => e.stopPropagation()}>
            <EmailVerification 
              onClose={() => setShowEmailVerification(false)} 
              userEmail={registeredEmail}
            />
          </div>        </div>
      )}
      
      {/* Fixed GitHub logo at bottom right */}
      <GitHubLogo repositoryUrl="https://github.com/Felix-Alfred-Gomez/myportfolio" />
    </div>
  );
}

export default Home;