import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate

function PortfolioContent({ username, skills, isPublished, handleSkillChange }) {
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

  const handleSkillChange = (index, newSkill) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = newSkill;
    setSkills(updatedSkills);
  };

  const handlePublish = () => {
    // Open a new tab and render the non-editable version of the portfolio
    const newTab = window.open();
    const newTabRoot = newTab.document.createElement("div");
    newTab.document.body.appendChild(newTabRoot);

    // Render the PortfolioContent component in the new tab
    newTab.document.title = `Portfolio de ${username}`;
    newTab.document.body.style.margin = "0";
    newTab.document.body.style.fontFamily = "Arial, sans-serif";

    const renderPortfolio = (
      <PortfolioContent username={username} skills={skills} isPublished={true} handleSkillChange={() => {}} />
    );

    // Use ReactDOM.createRoot for React 18 and later
    import("react-dom/client").then((ReactDOM) => {
      const root = ReactDOM.createRoot(newTabRoot);
      root.render(renderPortfolio); // Correctly pass the JSX element
    });

    // Simulate saving the portfolio to the database
    console.log("Portfolio published:", { username, skills });

    // TODO: Add backend API call to save the portfolio and make it publicly accessible
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

      {/* Render Portfolio Content */}
      <PortfolioContent
        username={username}
        skills={skills}
        isPublished={isPublished}
        handleSkillChange={handleSkillChange}
      />
    </div>
  );
}

export default PortfolioTemplate;