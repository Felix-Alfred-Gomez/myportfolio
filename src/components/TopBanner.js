import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PushPortfolioData } from "../hooks/HandlePortfolioData";

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
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "60px",
          backgroundColor: "#1e1e2f",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
          padding: "0 20px",
        }}
      >
        {!isPublished && (
          <button
            onClick={() => navigate("/dashboard")}
            style={{
              position: "absolute",
              left: "20px",
              padding: "10px 20px",
              backgroundColor: "#6163fb",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Dashboard
          </button>
        )}

        {!isPublished && (
          <button
            onClick={handlePublish}
            style={{
              position: "absolute",
              right: "20px",
              padding: "10px 20px",
              backgroundColor: "#6163fb",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Publier Portfolio
          </button>
        )}

        <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
          <a href="#home" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>
            Accueil
          </a>
          <a
            href="#skills"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("skills").scrollIntoView({ behavior: "smooth" });
            }}
            style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}
          >
            Compétences
          </a>
        </div>
      </nav>

      {/* Modal for Portfolio URL */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            zIndex: "1001",
            textAlign: "center",
          }}
        >
          <h2>Votre portfolio a été publié !</h2>
          <p>
            Visitez-le à :{" "}
            <a href={portfolioUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#6163fb" }}>
              {portfolioUrl}
            </a>
          </p>
          <button
            onClick={() => setShowModal(false)}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              backgroundColor: "#6163fb",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Fermer
          </button>
        </div>
      )}

      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: "1000",
          }}
        ></div>
      )}
    </>
  );
}