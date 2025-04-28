import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Import Firestore

export function PortfolioContent({ username, skills, isPublished, handleSkillChange }) {

  return (
    <div>
      {/* First Section: User Name */}
      <section style={{ backgroundColor: "grey", color: "white", padding: "50px 0", textAlign: "center" }}>
        <h1>{username ? `Bienvenue sur le portfolio de ${username}` : "Bienvenue sur le portfolio"}</h1>
      </section>

      {/* Second Section: Compétences */}
      <section style={{ backgroundColor: "blue", color: "white", padding: "50px 20px" }}>
        <h2 style={{ textAlign: "center" }}>Compétences</h2>
        <ul style={{ listStyleType: "none", padding: 0, textAlign: "center" }}>
          {skills.map((skill, index) => (
            <li key={index}>
              {isPublished ? (
                <span style={{ display: "block", padding: "5px", color: "white" }}>{skill}</span>
              ) : (
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  style={{
                    textAlign: "center",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function PortfolioTemplate() {
  const { username } = useParams(); // Get the username from the URL
  const navigate = useNavigate(); // Initialize the navigate function
  const [skills, setSkills] = useState(["Compétence 1", "Compétence 2", "Compétence 3"]);
  const [isPublished] = useState(false); // State to toggle between editable and published view
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [portfolioUrl, setPortfolioUrl] = useState(""); // State to store the portfolio URL

  const handleSkillChange = (index, newSkill) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = newSkill;
    setSkills(updatedSkills);
  };

  const handlePublish = async () => {
    const db = getFirestore(); // Initialize Firestore

    try {
      // Dynamically set the base URL
      const baseUrl = window.location.origin;
      const url = `${baseUrl}/${username}`;
      
      // Save portfolio data to Firestore
      await setDoc(doc(db, "publicPortfolios", username), {
        username,
        skills,
        publishedAt: new Date().toISOString(),
      });

      console.log("Portfolio published:", { username, skills });

      // Set the portfolio URL and show the modal
      setPortfolioUrl(url);
      setShowModal(true);
    } catch (error) {
      console.error("Error publishing portfolio:", error);
    }
  };

  return (
    <div>
      {/* Top Banner */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          backgroundColor: "#333",
          color: "white",
          position: "sticky",
          top: "0",
          zIndex: "1000",
        }}
      >
        {/* Dashboard Button */}
        <button
          onClick={() => navigate("/dashboard")} // Navigate to the dashboard route
          style={{
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

        {/* Publier Portfolio Button */}
        {!isPublished && (
          <button
            onClick={handlePublish}
            style={{
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
      </header>

      {/* Render Portfolio Content Only for Editing */}
      {!isPublished && (
        <PortfolioContent
          username={username}
          skills={skills}
          isPublished={isPublished}
          handleSkillChange={handleSkillChange}
        />
      )}

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

      {/* Modal Background */}
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

export default PortfolioTemplate;