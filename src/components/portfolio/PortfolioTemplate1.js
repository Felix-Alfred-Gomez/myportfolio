import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { GetPortfolioData } from "../../hooks/HandlePortfolioData";
import SkillsSection from "./SkillsSection";
import AccueilSection from "./AccueilSection";
import { useNavigate } from "react-router-dom";
import { PushPortfolioData } from "../../hooks/HandlePortfolioData";
import "../../styles/PortfolioTemplate1.css";

export function PortfolioContent({ isPublished }) {
  const { username } = useParams();
  const [data, setData] = GetPortfolioData(username);
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
    <div style={{ scrollBehavior: "smooth" }}>

        {!isPublished && (
          <>
            <button 
              className="button-template1 publish"
              onClick={handlePublish}>
              Publier
            </button>

            <button 
              className="button-template1 return"
              onClick={() => navigate("/dashboard")}>
              Retour
            </button>
          </>
        )}


        {/* Modal for Portfolio URL */}
        {showModal && (
          <>  
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

            <div
             className="modal-overlay"
             onClick={() => setShowModal(false)}>

            </div>
          </>
        )}

      <nav className="nav-template1">
        <a 
          className="portfolio-anchor"
          href="#home">Accueil</a>
        <a 
          className="portfolio-anchor"
          href="#skills"
          onClick={(e) => {
          e.preventDefault();
          document.getElementById("skills").scrollIntoView({ behavior: "smooth" });
          }}>
          Compétences
        </a>
      </nav>

      {/* Section 1: Accueil */}
      <AccueilSection 
      username={username}
      isPublished={isPublished}
      data={data}
      setData={setData}
      />

      {/* Section 2: Compétences */}
      <SkillsSection
        data={data}
        setData={setData}
        isPublished={isPublished} />
    </div>
  );
}