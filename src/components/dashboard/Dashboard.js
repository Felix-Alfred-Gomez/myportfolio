// filepath: h:\CODE\myportfolio\src\components\Dashboard\Dashboard.js
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";
import "./dashboard.css"; // Import the CSS file

function Dashboard() {
  const [username, setUsername] = useState("");
  const auth = getAuth();
  const database = getDatabase();
  const navigate = useNavigate();

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
    <div>
      {/* Banner Section */}
      <div className="dashboard-banner">
        <button
          onClick={() => navigate("/")}
          className="retour-button"
        >
          Retour
        </button>
        Bienvenue sur votre tableau de bord
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        <h1>Bienvenue {username}!</h1>
        <button
          onClick={handleCreatePortfolio}
          className="action-button"
        >
          Editer mon Portfolio
        </button>
        <button
          onClick={handleViewPortfolio}
          className="action-button"
        >
          Voir mon Portfolio
        </button>
      </div>
    </div>
  );
}

export default Dashboard;