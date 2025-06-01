import { useState } from "react";
import { usePortfolioImage } from "../../../hooks/HandlePortfolioImage";
import "../../../styles/PortfolioTemplate.css";
import "../../../styles/AccueilSection.css";
import UpdateText from "./UpdateText";
import { handleFieldChange } from '../../../hooks/HandlePortfolioData';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import AccueilOptionsModal from "./AccueilOptionsModal";


export default function AccueilSection({ username, isPublished, data, setData }) {
  const { imageUrl: profilePic, handleImageUpload: handleProfileUpload } = usePortfolioImage(username, "Profile");
  const { imageUrl: backgroundUrl, handleImageUpload: handleBackgroundUpload } = usePortfolioImage(username, "AccueilBackground");
  const [showDesignModal, setShowDesignModal] = useState(false);
// Suppression de fieldChangeHandler, utilisation directe de handleFieldChange
  return (
    <section
      id="home"
      className="accueil-section"
      style={backgroundUrl ? { backgroundImage: `url(${backgroundUrl})`,
      backgroundSize: "cover", backgroundPosition: "center" } : {}}>
      
      {!isPublished && (
        <button
          className="accueil-option-wheel"
          title="Options"
          onClick={() => setShowDesignModal(true)}>
          <Cog6ToothIcon className="accueil-option-wheel-icon" />
        </button>
      )}

      {/* Design Options Modal */}
      <AccueilOptionsModal
        show={showDesignModal}
        onClose={() => setShowDesignModal(false)}
        setData={setData}
        data={data}
        isPublished={isPublished}
        handleBackgroundUpload={handleBackgroundUpload}
        handleProfileUpload={handleProfileUpload}
      />

      <div className="accueil-profile-pic-wrapper">
        <img
          src={profilePic}
          alt="Profile"
          className="accueil-profile-img"
        />
      </div>
      
      <UpdateText
        data={data}
        isPublished={isPublished}
        value={data.name}
        onChange={handleFieldChange(setData, data, 'name')}
        containerClass="accueil-text-container accueil-name-container"
        textClass="accueil-text"
        inputClass="accueil-text-input"
        fontFamilyStyle={data.accueilProps.AccueilFontFamilyTitle}
        fontFamilySize={data.accueilProps.AccueilFontSizeTitle}
        fontFamilyWeight={data.accueilProps.AccueilFontWeightTitle}
        fontColor={data.accueilProps.AccueilColorTitle}/>
      
      <UpdateText
        data={data}
        isPublished={isPublished}
        value={data.BIO}
        onChange={handleFieldChange(setData, data, 'BIO')}
        containerClass="accueil-text-container accueil-BIO-container"
        textClass="accueil-text"
        inputClass="accueil-text-input"
        fontFamilyStyle={data.accueilProps.AccueilFontFamilyBIO}
        fontFamilySize={data.accueilProps.AccueilFontSizeBIO}
        fontFamilyWeight={data.accueilProps.AccueilFontWeightBIO}
        fontColor={data.accueilProps.AccueilColorBIO}/>

    </section>
  );
}