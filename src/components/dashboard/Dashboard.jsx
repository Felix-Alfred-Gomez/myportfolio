// filepath: h:\CODE\myportfolio\src\components\Dashboard\Dashboard.js
import React, { useEffect, useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css"; // Import the CSS file
import "../../styles/common.css"; // Import the common CSS file
import { FetchUsername } from "../../hooks/HandlePortfolioData";
import LoginButton from "../common/LoginButton"; // Import the LoginButton component
import { AuthContext } from "../../context/AuthContext"; // Importer le contexte

function Dashboard() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const { setIsAuthenticated } = useContext(AuthContext);
  const [ setShowLogin] = useState(false);
  // Function to modify the showLogin state and display/hide the login modal
  const toggleLoginModal = (state) => setShowLogin(state);

    // Fonction to modify the authentication state
    const handleAuthChange = (status) => {
      setIsAuthenticated(status);
      if (!status) console.log("User logged out");
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
        <h1 className="title">MyPortfolio</h1>
        <LoginButton 
          onLoginClick={() => toggleLoginModal(true)} 
          onLogoutClick={() => handleAuthChange(false)} 
        />
      </nav>

      <div className="subtitle">
        <h2>Dashboard de {username}!</h2>
      </div>
      
      <div className="buttons-group">
        <button
          className="button2"
          onClick={handleCreatePortfolio}>
          Editer mon Portfolio
        </button>

        <button
          className="button2"
          onClick={handleViewPortfolio}>
          Voir mon Portfolio
        </button>
      </div>
    </div>
  );
}

export default Dashboard;