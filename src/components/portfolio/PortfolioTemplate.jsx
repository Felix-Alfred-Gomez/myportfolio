import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetPortfolioData, PushPortfolioData } from "../../hooks/HandlePortfolioData";
// import SkillsSection from "./SkillsSection/SkillsSection";
import AccueilSection from "./AccueilSection/AccueilSection";
import ProjetSection from "./ProjetSection/ProjetSection";
import PublishModal from "./PublishModal";
import PortfolioNavWrapper from "./NavigationSection/PortfolioNavWrapper";
import LeaveEditModal from "./LeaveEditModal";
import WelcomeEditModal from "./WelcomeEditModal";
// import { HiOutlineSave } from "react-icons/hi";
import { RiArrowGoBackFill } from "react-icons/ri";
import "../../styles/PortfolioTemplate.css";
import { FaSave } from "react-icons/fa";
import CopyPortfolioLinkButton from "./CopyPortfolioLinkButton";

export function PortfolioContent({ isPublished }) {
  const { username } = useParams();
  const [data, setData] = GetPortfolioData(username);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showCopyInfo, setShowCopyInfo] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const menuRef = useRef(null);
  const burgerRef = useRef(null);

  const handlePublish = async () => {
    try {
      setIsPublishing(true);
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
    } finally {
      setIsPublishing(false);
    }
  };

  const handleReturnClick = (e) => {
    e.preventDefault();
    setShowLeaveModal(true);
  };

  const handleLeaveContinue = () => {
    setShowLeaveModal(false);
    navigate("/dashboard");
  };

  const handleLeaveClose = () => {
    setShowLeaveModal(false);
  };

  // New handler to publish and close the modal
  const handlePublishAndClose = async () => {
    await handlePublish();
    handleLeaveClose();
  };

  const handleCopyUrl = () => {
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/${username}`;
    navigator.clipboard.writeText(url);
    setShowCopyInfo(true);
    setTimeout(() => setShowCopyInfo(false), 2000);
  };

  return (
    <div className="container-template">
      {!isPublished && (
        <>
          <CopyPortfolioLinkButton onClick={handleCopyUrl} />

          <button className="button-template publish" onClick={handlePublish} disabled={isPublishing}>
            <FaSave className="button-template-icon" />
          </button>

          <button className="button-template return" onClick={handleReturnClick}>
            <RiArrowGoBackFill className="button-template-icon" />
          </button>
        </>
      )}

      {/* LeaveEditModal */}
      <LeaveEditModal
        show={showLeaveModal}
        onClose={handleLeaveClose}
        onContinue={handleLeaveContinue}
        onPublish={handlePublishAndClose}
      />

      {/* Navigation Wrapper */}
      <PortfolioNavWrapper
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

      {/* WelcomeEditModal */}
      <WelcomeEditModal show={showWelcomeModal} onClose={() => setShowWelcomeModal(false)} />

      <AccueilSection
        username={username}
        isPublished={isPublished}
        data={data}
        setData={setData}
      />

      <ProjetSection
        username={username}
        isPublished={isPublished}
        data={data}
        setData={setData}
      />

      {/* <SkillsSection
        username={username}
        data={data}
        setData={setData}
        isPublished={isPublished}
      /> */}

      {showCopyInfo && (
        <div className="copy-info-box">Lien vers portfolio publique copié</div>
      )}
    </div>
  );
}
