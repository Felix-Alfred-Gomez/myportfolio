import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetPortfolioData, PushPortfolioData } from "../../hooks/HandlePortfolioData";
import SkillsSection from "./SkillsSection";
import AccueilSection from "./AccueilSection";
import BurgerIcon from "./BurgerIcon";
import SideMenu from "./SideMenu";
import PublishModal from "./PublishModal";
import MainNav from "./MainNav";
import "../../styles/PortfolioTemplate1.css";

export function PortfolioContent({ isPublished }) {
  const { username } = useParams();
  const [data, setData] = GetPortfolioData(username);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
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
    <div className="container-template1">
      {!isPublished && (
        <>
          <button className="button-template1 publish" onClick={handlePublish}>
            Publier
          </button>
          <button className="button-template1 return" onClick={() => navigate("/dashboard")}>
            Retour
          </button>
        </>
      )}

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

      {/* Modal */}
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
