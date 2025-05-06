import React from "react";
import "../../styles/SkillsSection.css";

export default function SkillsSection({ data, setData, isPublished }) {
  const handleSkillChange = (index, newSkill) => {
    const updatedSkills = [...data.skills];
    updatedSkills[index] = newSkill;
    setData({ ...data, skills: updatedSkills });
  };

  return (
    <section id="skills">
      <h2>Compétences</h2>
      <ul>
        {data.skills.map((skill, index) => (
          <li key={index}>
            {isPublished ? (
              <span>{skill}</span>
            ) : (
              <input
                type="text"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
              />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}