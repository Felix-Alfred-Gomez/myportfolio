import React from "react";
import { useParams } from "react-router-dom";

function PortfolioTemplate() {
  const { username } = useParams(); // Get the username from the URL

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
          <li>Compétence 1</li>
          <li>Compétence 2</li>
          <li>Compétence 3</li>
        </ul>
      </section>
    </div>
  );
}

export default PortfolioTemplate;