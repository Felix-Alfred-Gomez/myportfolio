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
  const [navBarColor, setNavBarColor] = useState("#ffffff");
  const [navLinkColor, setNavLinkColor] = useState("#000000");
  const [navBarAlpha, setNavBarAlpha] = useState(0.5);
  const menuRef = useRef(null);
  const burgerRef = useRef(null);

  // Group navigation props
  const navProps = {
    navBarColor,
    setNavBarColor,
    navLinkColor,
    setNavLinkColor,
    navBarAlpha,
    setNavBarAlpha,
  };

  const handlePublish = async () => {
    try {
      const baseUrl = window.location.origin;
      const url = `${baseUrl}/${username}`;
      await PushPortfolioData(username, data);
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
        navProps={navProps}
        isPublished={isPublished}
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
