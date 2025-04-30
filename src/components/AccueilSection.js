import React, { useState } from "react";

export default function AccueilSection({ username }) {
  const [profilePic, setProfilePic] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

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
      <div
        style={{
          position: "relative",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          overflow: "hidden",
          border: "2px solid #ccc",
          marginBottom: "20px",
          cursor: "pointer",
        }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            opacity: 0,
            cursor: "pointer",
          }}
        />
        {profilePic ? (
          <img
            src={profilePic}
            alt="Profile"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#ccc",
              fontSize: "0.9rem",
            }}
          >
            Upload
          </div>
        )}
      </div>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>
        {username ? `Bienvenue sur le portfolio de ${username}` : "Bienvenue sur le portfolio"}
      </h1>
      <p style={{ fontSize: "1.2rem", color: "#ccc" }}>
        Faites défiler pour découvrir les compétences.
      </p>
    </section>
  );
}