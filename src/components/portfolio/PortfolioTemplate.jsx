import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetPortfolioData, PushPortfolioData } from "../../hooks/HandlePortfolioData";
import SkillsSection from "./SkillsSection/SkillsSection";
import AccueilSection from "./AccueilSection/AccueilSection";
import PublishModal from "./PublishModal";
import PortfolioNavWrapper from "./NavigationSection/PortfolioNavWrapper";
import "../../styles/PortfolioTemplate.css";

export function PortfolioContent({ isPublished }) {
  const { username } = useParams();
  const [data, setData] = GetPortfolioData(username);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDesignModal, setShowDesignModal] = useState(false);
  const menuRef = useRef(null);
  const burgerRef = useRef(null);

  const handlePublish = async () => {
    try {
      const baseUrl = window.location.origin;
      const url = `${baseUrl}/${username}`;
      // Update data before publishing
      const dataToPush = {
        ...data
      };
      await PushPortfolioData(username, dataToPush);
      setPortfolioUrl(url);
      setShowModal(true);
    } catch (error) {
      console.error("Error publishing portfolio:", error);
    }
  };

  return (
    <div className="container-template">
      {!isPublished && (
        <>
          <button className="button-template publish" onClick={handlePublish}>
            Publier
          </button>

          <button className="button-template return" onClick={() => navigate("/dashboard")}>
            Retour
          </button>
        </>
      )}

      {/* Navigation Wrapper */}
      <PortfolioNavWrapper
        showDesignModal={showDesignModal}
        setShowDesignModal={setShowDesignModal}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        menuRef={menuRef}
        burgerRef={burgerRef}
        navProps={data.navProps}
        setData={setData}
        isPublished={isPublished}
        data={data}
      />

      {/* PublishModal */}
      <PublishModal
        show={showModal}
        url={portfolioUrl}
        onClose={() => setShowModal(false)}
      />

      <AccueilSection
        username={username}
        isPublished={isPublished}
        data={data}
        setData={setData}
      />

      <SkillsSection
        username={username}
        data={data}
        setData={setData}
        isPublished={isPublished}
      />
    </div>
  );
}
