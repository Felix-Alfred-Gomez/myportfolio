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
      navigate(`/portfolio-edition/${username}`); // Redirect to the portfolio template page
    } else {
      alert("Veuillez vous connecter pour créer un portfolio.");
    }
  };

  const handleViewPortfolio = () => {
    if (username) {
      navigate(`/${username}`); // Redirect to the user's portfolio page
    } else {
      alert("Veuillez vous connecter pour voir votre portfolio.");
    }
  };

  return (
    <div>
      {/* Banner Section */}
      <div
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "20px",
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "bold",
          position: "relative", // Added to position the "Retour" button
        }}
      >
        {/* Retour Button */}
        <button
          onClick={() => navigate("/")} // Redirect to the home page
          style={{
            position: "absolute",
            top: "50%",
            left: "20px",
            transform: "translateY(-50%)",
            padding: "10px 20px",
            backgroundColor: "white",
            color: "#4CAF50",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Added shadow for better design
          }}
        >
          Retour
        </button>
        Bienvenue sur votre tableau de bord
      </div>

      {/* Main Content */}
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>Bienvenue {username}!</h1>
        <button
          onClick={handleCreatePortfolio}
          style={{
            marginTop: "20px", // Add spacing between the text and button
            padding: "10px 20px",
            backgroundColor: "#4CAF50", // Updated color to match the website theme
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Added shadow for better design
            marginRight: "10px", // Add space between the two buttons
          }}
        >
          Editer mon Portfolio
        </button>
        <button
          onClick={handleViewPortfolio}
          style={{
            marginTop: "20px", // Add spacing between the buttons
            padding: "10px 20px",
            backgroundColor: "#4CAF50", // Updated color to match the website theme
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Added shadow for better design
          }}
        >
          Voir mon Portfolio
        </button>
      </div>
    </div>
  );
}

export default Dashboard;