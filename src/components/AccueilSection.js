import React from "react";

export default function AccueilSection({ username }) {
  return (
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
  );
}