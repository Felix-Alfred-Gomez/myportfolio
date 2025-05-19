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

function Home() {
  // Import variables
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false); // Add this state
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
                setShowLogin(true); // Optionally open login after registration
              }}
              onClose={() => setShowRegister(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;