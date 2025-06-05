import { useState } from "react";
import { usePortfolioImage } from "../../../hooks/HandlePortfolioImage";
import UpdateText from "../../common/UpdateText";
import { handleFieldChange } from '../../../hooks/HandlePortfolioData';
// import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { FaPencilAlt } from "react-icons/fa";
import AccueilOptionsModal from "./AccueilOptionsModal";
import HeadDefault from "../../../assets/head_default.png";
import BackgroundDefault from "../../../assets/Accueil_default.jpg";


export default function AccueilSection({ username, isPublished, data, setData }) {
  const { imageUrl: profilePic, handleImageUpload: handleProfileUpload } = usePortfolioImage(username, "Profile", undefined, HeadDefault);
  const { imageUrl: backgroundUrl, handleImageUpload: handleBackgroundUpload } = usePortfolioImage(username, "AccueilBackground", undefined, BackgroundDefault);
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
          className="pen-edition template-page"
          title="Options"
          onClick={() => setShowDesignModal(true)}>
          <FaPencilAlt className="pen-icon blue" />
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
          alt=""
          className="accueil-profile-img"
        />
      </div>
      
      <UpdateText
        isPublished={isPublished}
        value={data.name}
        onChange={handleFieldChange(setData, data, 'name')}
        containerClass="accueil-text-container"
        textClass="accueil-text-input"
        fontFamilyStyle={data.accueilProps.AccueilFontFamilyTitle}
        fontFamilySize={data.accueilProps.AccueilFontSizeTitle}
        fontFamilyWeight={data.accueilProps.AccueilFontWeightTitle}
        fontColor={data.accueilProps.AccueilColorTitle}/>
      
      <UpdateText
        isPublished={isPublished}
        value={data.BIO}
        onChange={handleFieldChange(setData, data, 'BIO')}
        containerClass="accueil-text-container"
        textClass="accueil-text-input"
        fontFamilyStyle={data.accueilProps.AccueilFontFamilyBIO}
        fontFamilySize={data.accueilProps.AccueilFontSizeBIO}
        fontFamilyWeight={data.accueilProps.AccueilFontWeightBIO}
        fontColor={data.accueilProps.AccueilColorBIO}/>

    </section>
  );
}