import React, { useState, useRef, useEffect } from "react"; // Import useRef
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"; // Import Firestore

export function PortfolioContent({ username, skills, isPublished, handleSkillChange }) {
  const navigate = useNavigate(); // Initialize the navigate function
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [portfolioUrl, setPortfolioUrl] = useState(""); // State to store the portfolio URL

  const skillsSectionRef = useRef(null); // Create a ref for the "Compétences" section

  const handlePublish = async () => {
    const db = getFirestore(); // Initialize Firestore

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

  const scrollToSkills = () => {
    if (skillsSectionRef.current) {
      skillsSectionRef.current.scrollIntoView({ behavior: "smooth" });
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
        {/* Dashboard Button as Overlay */}
        {!isPublished && (<button
          onClick={() => navigate("/dashboard")} // Navigate to the dashboard route
          style={{
            position: "absolute", // Makes the button positioned relative to its nearest positioned ancestor (in this case, the <nav> element).
            left: "20px",         // Positions the button 20px from the left edge of the <nav>.
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
        </button>)}

        {/* Publier Portfolio Button */}
        {!isPublished && (<button
            onClick={handlePublish}
            style={{
              position: "absolute", // Makes the button positioned relative to its nearest positioned ancestor (in this case, the <nav> element).
              right: "20px",         // Positions the button 20px from the left edge of the <nav>.
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

        {/* Centered Links */}
        <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
          <a href="#home" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>
            Accueil
          </a>
          <a
            href="#skills"
            onClick={(e) => {
              e.preventDefault(); // Prevent default anchor behavior
              scrollToSkills(); // Trigger smooth scroll
            }}
            style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}
          >
            Compétences
          </a>
        </div>
      </nav>

      {/* Section 1: Accueil */}
      <section
        id="home"
        style={{
          height: "100vh",
          backgroundColor: "#2b2b3d",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          paddingTop: "60px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>
          {username ? `Bienvenue sur le portfolio de ${username}` : "Bienvenue sur le portfolio"}
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#ccc" }}>
          Faites défiler pour découvrir les compétences.
        </p>
      </section>

      {/* Section 2: Compétences */}
      <section
        id="skills"
        ref={skillsSectionRef} // Attach the ref to the "Compétences" section
        style={{
          height: "100vh",
          backgroundColor: "#4b4b9f",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <h2 style={{ fontSize: "2rem", marginBottom: "30px" }}>Compétences</h2>
        <ul style={{ listStyleType: "none", padding: 0, width: "100%", maxWidth: "600px" }}>
          {skills.map((skill, index) => (
            <li key={index} style={{ marginBottom: "15px", textAlign: "center" }}>
              {isPublished ? (
                <span style={{ display: "block", padding: "10px", backgroundColor: "#6163fb", borderRadius: "8px" }}>
                  {skill}
                </span>
              ) : (
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    textAlign: "center",
                    fontSize: "1rem",
                  }}
                />
              )}
            </li>
          ))}
        </ul>
      </section>
    
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

function PortfolioTemplate() {
  const { username } = useParams(); // Get the username from the URL
  const [skills, setSkills] = useState(["Compétence 1", "Compétence 2", "Compétence 3"]);
  const [isPublished] = useState(false); // State to toggle between editable and published view

  // Try to get the portfolio data first before using default values
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

  return (
    <div>
      {/* Render Portfolio Content Only for Editing */}
      {!isPublished && (
        <PortfolioContent
          username={username}
          skills={skills}
          isPublished={isPublished}
          handleSkillChange={handleSkillChange}
        />
      )}
    </div>
  );
}

export default PortfolioTemplate;