import React from "react";
import { useParams } from "react-router-dom";
import { GetPortfolioData } from "../hooks/GetPortfolioData";
import SkillsSection from "./SkillsSection";
import AccueilSection from "./AccueilSection";
import TopBanner from "./TopBanner"; // Import the new TopBanner component

export function PortfolioContent({ isPublished }) {
  const { username } = useParams();
  const [data, setData] = GetPortfolioData(username);

  return (
    <div style={{ scrollBehavior: "smooth" }}>
      {/* Top Navigation Banner */}
      <TopBanner
        username={username}
        isPublished={isPublished}
        skills={data.skills} />

      {/* Section 1: Accueil */}
      <AccueilSection username={username} />

      {/* Section 2: Compétences */}
      <SkillsSection
        id="skills"
        data={data}
        setData={setData}
        isPublished={isPublished} />
    </div>
  );
}