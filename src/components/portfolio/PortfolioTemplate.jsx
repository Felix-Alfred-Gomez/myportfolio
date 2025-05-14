import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetPortfolioData, PushPortfolioData } from "../../hooks/HandlePortfolioData";
import SkillsSection from "./SkillsSection";
import AccueilSection from "./AccueilSection";
import BurgerIcon from "./BurgerIcon";
import SideMenu from "./SideMenu";
import PublishModal from "./PublishModal";
import MainNav from "./MainNav";
import DesignOptionsModal from "./DesignOptionsModal";
import "../../styles/PortfolioTemplate.css";
import { Cog6ToothIcon } from '@heroicons/react/24/solid';

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

          <button
            className="button-template-option-wheel"
            title="Options"
            onClick={() => setShowDesignModal(true)}>
            <Cog6ToothIcon className="option-wheel-icon" />
          </button>

          <button className="button-template return" onClick={() => navigate("/dashboard")}>
            Retour
          </button>
        </>
      )}

      {/* Design Options Modal */}
      <DesignOptionsModal
        show={showDesignModal}
        onClose={() => setShowDesignModal(false)}
      />

      {/* Burger Icon */}
      <BurgerIcon
        ref={burgerRef}
        onClick={() => setMenuOpen(!menuOpen)}
        isOpen={menuOpen}
      />

      {/* Side menu */}
      <SideMenu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        menuRef={menuRef}
        burgerRef={burgerRef}
      />

      {/* PublishModal */}
      <PublishModal
        show={showModal}
        url={portfolioUrl}
        onClose={() => setShowModal(false)}
      />

      {/* Main Navigation - hidden on small screens */}
      <MainNav />

      <AccueilSection
        username={username}
        isPublished={isPublished}
        data={data}
        setData={setData}
      />

      <SkillsSection
        data={data}
        setData={setData}
        isPublished={isPublished}
      />
    </div>
  );
}
