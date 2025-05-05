import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PushPortfolioData } from "../../hooks/HandlePortfolioData";
import "./AccueilTopBanner.css"; // Import du fichier CSS
import "../../styles/common.css"; // Import the common CSS file

export default function TopBanner({ data, username, isPublished }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [portfolioUrl, setPortfolioUrl] = useState("");

  const handlePublish = async () => {
    try {
      const baseUrl = window.location.origin;
      const url = `${baseUrl}/${username}`;

      await PushPortfolioData(username, data);

      setPortfolioUrl(url);
      setShowModal(true);
    } catch (error) {
      console.error("Error publishing portfolio:", error);
    }
  };

  return (
    <>
      <nav>
      {!isPublished && (
          <button 
          className="button"
          style={{ backgroundColor: "#b81e1e", color: "white" }}
          onClick={handlePublish}>
            Sauvegarder et Publier
          </button>
        )}

        {!isPublished && (
          <button 
          className="button"
          style={{ backgroundColor: "grey", color: "white" }}
          onClick={() => navigate("/dashboard")}>
            Retour
          </button>

        )}

        <div>
          <a href="#home">Accueil</a>
          <a 
          href="#skills"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("skills").scrollIntoView({ behavior: "smooth" });
          }}>
            Compétences
          </a>
        </div>
      </nav>

      {/* Modal for Portfolio URL */}
      {showModal && (
        <div className="modal">
          <h2>Votre portfolio a été publié !</h2>
          <p>
            Visitez-le à :{" "}
            <a href={portfolioUrl} target="_blank" rel="noopener noreferrer">
              {portfolioUrl}
            </a>
          </p>
          <button onClick={() => setShowModal(false)}>Fermer</button>
        </div>
      )}

      {showModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowModal(false)}
        ></div>
      )}
    </>
  );
}