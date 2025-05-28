import "../../../styles/SkillsSection.css";
import "../../../styles/common.css";
import { usePortfolioImage } from "../../../hooks/HandlePortfolioImage";
import UpdateBackground from "../../common/UpdateBackground";
import "../../../styles/AccueilSection.css";

export default function SkillsSection({ username, data, setData, isPublished }) {
  const handleSkillChange = (index, newSkill) => {
    const updatedSkills = [...data.skills];
    updatedSkills[index] = newSkill;
    setData({ ...data, skills: updatedSkills });
  };

  const { imageUrl: backgroundUrl, handleImageUpload: handleBackgroundUpload } = usePortfolioImage(username, "SkillsBackground");

  return (
    <section 
    id="skills"
    className="accueil-section"
    style={backgroundUrl ? { backgroundImage: `url(${backgroundUrl})`,
    backgroundSize: "cover", backgroundPosition: "center" } : {}}>

      {/* Upload icon in top right */}
      {!isPublished && (
        <UpdateBackground 
          onUpload={handleBackgroundUpload} 
          disabled={isPublished} />
      )}

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