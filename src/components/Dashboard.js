// filepath: h:\CODE\myportfolio\src\components\Dashboard\Dashboard.js
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get, set } from "firebase/database";
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

  const handlePublishPortfolio = async () => {
    if (username) {
      // Save the portfolio data in a public node
      await set(ref(database, `publicPortfolios/${username}`), {
        username: username,
        title: `Portfolio de ${username}`,
      });
      alert("Votre portfolio a été publié !");
      navigate(`/${username}`); // Redirect to the public portfolio page
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Bienvenue {username}!</h1>
        <button onClick={handlePublishPortfolio}>Publier PortFolio</button>
      </div>
    </div>
  );
}

export default Dashboard;