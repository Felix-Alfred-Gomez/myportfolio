import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import SkillsSection from "./SkillsSection"; // Import the SkillsSection component
import AccueilSection from "./AccueilSection"; // Import the new AccueilSection component

export function PortfolioContent({ isPublished }) {
  const { username } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [skills, setSkills] = useState(["Compétence 1", "Compétence 2", "Compétence 3"]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const db = getFirestore();
      const docRef = doc(db, "publicPortfolios", username);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setSkills(data.skills || ["Compétence 1", "Compétence 2", "Compétence 3"]);
        }
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      }
    };
    fetchPortfolio();
  }, [username]);

  const handleSkillChange = (index, newSkill) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = newSkill;
    setSkills(updatedSkills);
  };

  const handlePublish = async () => {
    const db = getFirestore();

    try {
      const baseUrl = window.location.origin;
      const url = `${baseUrl}/${username}`;

      await setDoc(doc(db, "publicPortfolios", username), {
        username,
        skills,
        publishedAt: new Date().toISOString(),
      });

      console.log("Portfolio published:", { username, skills });

      setPortfolioUrl(url);
      setShowModal(true);
    } catch (error) {
      console.error("Error publishing portfolio:", error);
    }
  };

  return (
    <div style={{ scrollBehavior: "smooth" }}>
      {/* Top Navigation Banner */}
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

      {/* Section 1: Accueil */}
      <AccueilSection username={username} />

      {/* Section 2: Compétences */}
      <SkillsSection
        id="skills"
        skills={skills}
        isPublished={isPublished}
        onSkillChange={handleSkillChange}
      />

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
    </div>
  );
}