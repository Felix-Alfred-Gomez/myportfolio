// filepath: h:\CODE\myportfolio\src\components\Dashboard\Dashboard.js
import React, { useEffect, useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/common.css"; 
import LoginButton from "../common/LoginLogo"; 
import { AuthContext, FetchUsername} from "../../context/AuthContext"; 
import LogoButton from "../common/WebsiteLogo"; 
import dashboardBackground from "../../assets/dashboard.png";
import { getAuth, signOut } from "firebase/auth";

function Dashboard() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const { setIsAuthenticated } = useContext(AuthContext);
  const [ setShowLogin] = useState(false);
  // Function to modify the showLogin state and display/hide the login modal
  const toggleLoginModal = (state) => setShowLogin(state);

  // Fonction to modify the authentication state
  const handleAuthChange = async (status) => {
    if (!status) {
      const auth = getAuth();
      await signOut(auth);
      console.log("User logged out");
    }
    setIsAuthenticated(status);
  };

  useEffect(() => {
    const fetchAndSetUsername = async () => {
      const username = await FetchUsername();
      if (username) {
        setUsername(username);
      }
    };

    fetchAndSetUsername();
  }, []);

  const handleCreatePortfolio = () => {
    if (username) {
      navigate(`/portfolio-edition/${username}`);
    } else {
      alert("Veuillez vous connecter pour créer un portfolio.");
    }
  };

  const handleViewPortfolio = () => {
    if (username) {
      navigate(`/${username}`);
    } else {
      alert("Veuillez vous connecter pour voir votre portfolio.");
    }
  };

  return (
    <div className="container">
      <nav className="nav-site">
        <LogoButton />
        <LoginButton 
          onLoginClick={() => toggleLoginModal(true)} 
          onLogoutClick={() => handleAuthChange(false)} 
        />
      </nav>

      {/* Fullscreen hero section with overlay */}
      <section className="hero-section">
        <img src={dashboardBackground} alt="Background" className="hero-background" />
        <div className="hero-overlay-dashboard">
          <h2>Dashboard</h2>

          <div className="buttons-group">
            <button
              className="button"
              onClick={handleCreatePortfolio}>
              Editer mon Portfolio
            </button>

            <button
              className="button"
              onClick={handleViewPortfolio}>
              Voir mon Portfolio
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;