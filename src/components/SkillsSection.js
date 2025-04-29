import React from "react";

export default function SkillsSection({ id, data, setData, isPublished }) {
  const handleSkillChange = (index, newSkill) => {
    const updatedSkills = [...data.skills];
    updatedSkills[index] = newSkill;
    setData({ ...data, skills: updatedSkills });
  };

  return (
    <section
      id={id}
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
        {data.skills.map((skill, index) => (
          <li key={index} style={{ marginBottom: "15px", textAlign: "center" }}>
            {isPublished ? (
              <span
                style={{
                  display: "block",
                  padding: "10px",
                  backgroundColor: "#6163fb",
                  borderRadius: "8px",
                }}
              >
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
  );
}