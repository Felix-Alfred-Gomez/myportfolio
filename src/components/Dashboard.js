// filepath: h:\CODE\myportfolio\src\components\Dashboard\Dashboard.js
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";

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
          setUsername(data.username); // Set the username from the database
        }
      }
    };

    fetchUsername();
  }, [auth, database]);

  const handleCreatePortfolio = () => {
    if (username) {
      navigate(`/portfolio-template/${username}`); // Redirect to the portfolio template page
    } else {
      alert("Veuillez vous connecter pour créer un portfolio.");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Bienvenue {username}!</h1>
        <button onClick={handleCreatePortfolio}>Créer PortFolio</button>
      </div>
    </div>
  );
}

export default Dashboard;