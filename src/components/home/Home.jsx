import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../authentication/Login";
import LoginButton from "../common/LoginButton"; // Import the LoginButton component
import LogoButton from "../common/LogoButton"; // Import the LogoButton component
import "../../styles/common.css"; // Import the common CSS file
import { AuthContext } from "../../context/AuthContext"; // Importer le contexte
import homeBackground from "../../assets/hero_home.png";
import { getAuth, signOut } from "firebase/auth";

function Home() {
  // Import variables
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(false);
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

  // Function to modify the showLogin state and display/hide the login modal
  const toggleLoginModal = (state) => setShowLogin(state);

  const navigatetodashbboard = () => {
    if (isAuthenticated) {
      navigate(`/dashboard`);
    } else {
        toggleLoginModal(true); // Show the login modal;
        if (isAuthenticated) {navigate(`/dashboard`);}
    }
  };

  return (
    <div className="container">
      <nav className="nav-site">
        <LogoButton />

        <LoginButton 
          onLoginClick={() => toggleLoginModal(true)} 
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
          e.target.classList.contains("login-container") && toggleLoginModal(false)}>
          <div className="login-box" onClick={(e) => e.stopPropagation()}>
            <Login
              onLoginSuccess={() => {
                handleAuthChange(true);
                toggleLoginModal(false);
                navigate("/dashboard");
              }}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;