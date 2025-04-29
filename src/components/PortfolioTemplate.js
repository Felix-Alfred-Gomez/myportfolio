import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import SkillsSection from "./SkillsSection";
import AccueilSection from "./AccueilSection";
import TopBanner from "./TopBanner"; // Import the new TopBanner component

export function PortfolioContent({ isPublished }) {
  const { username } = useParams();
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

  return (
    <div style={{ scrollBehavior: "smooth" }}>
      {/* Top Navigation Banner */}
      <TopBanner
        username={username}
        isPublished={isPublished}
        skills={skills}
      />

      {/* Section 1: Accueil */}
      <AccueilSection username={username} />

      {/* Section 2: Compétences */}
      <SkillsSection
        id="skills"
        skills={skills}
        isPublished={isPublished}
        onSkillChange={handleSkillChange}
      />
    </div>
  );
}