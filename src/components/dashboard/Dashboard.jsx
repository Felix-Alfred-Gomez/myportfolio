// filepath: h:\CODE\myportfolio\src\components\Dashboard\Dashboard.js
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";
import "./dashboard.css"; // Import the CSS file
import "../../styles/common.css"; // Import the common CSS file

function Dashboard() {
  const [username, setUsername] = useState("");
  const auth = getAuth();
  const database = getDatabase();
  const navigate = useNavigate();

    // State to track hover status
    const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchUsername = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = ref(database, `users/${user.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setUsername(data.username);
        }
      }
    };

    fetchUsername();
  }, [auth, database]);

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
      <div className="top-banner">

      <h1 className="title" >MyPortfolio</h1>

        <button
            className={`button ${isHovered ? "hovered" : ""}`}
            onClick={() => navigate("/")}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            Retour
          </button>

      </div>

      {/* Main Content */}
      <div className="subtitle">
        <h1>Bienvenue {username}!</h1>
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