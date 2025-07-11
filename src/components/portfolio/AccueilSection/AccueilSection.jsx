import { useState } from "react";
import { usePortfolioImage } from "../../../hooks/HandlePortfolioImage";
import UpdateText from "../../common/UpdateText";
import { handleFieldChange, handleNestedFieldChange } from '../../../hooks/HandlePortfolioData';
// import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { FaPencilAlt } from "react-icons/fa";
import AccueilOptionsModal from "./AccueilOptionsModal";
import HeadDefault from "../../../assets/head_default.png";
import BackgroundDefault from "../../../assets/Accueil_default.jpg";
import UpdateProfile from "./UpdateProfile";
import UpdateSocialLinks from "../../common/UpdateSocialLinks";


export default function AccueilSection({ username, isPublished, data, setData }) {
  const { imageUrl: profilePic, handleImageUpload: handleProfileUpload } = usePortfolioImage(username, "Profile", undefined, HeadDefault);
  const { imageUrl: backgroundUrl, handleImageUpload: handleBackgroundUpload } = usePortfolioImage(username, "AccueilBackground", undefined, BackgroundDefault);
  const [showDesignModal, setShowDesignModal] = useState(false);

  return (
    <section
      id="home"
      className="accueil-section"
      style={backgroundUrl ? { backgroundImage: `url(${backgroundUrl})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}>
      
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

      {/* Profile Image Section */}
      <UpdateProfile
        profilePic={profilePic}
        handleProfileUpload={handleProfileUpload}
        isPublished={isPublished}
      />

      {/* Other components */}
      <UpdateText
        isPublished={isPublished}
        value={data.name}
        onChange={handleFieldChange(setData, data, 'name')}
        containerClass="accueil-text-container"
        textClass="accueil-text-input"
        fontFamilyStyle={data.accueilProps.AccueilFontFamilyTitle}
        fontFamilySize={data.accueilProps.AccueilFontSizeTitle}
        fontFamilyWeight={data.accueilProps.AccueilFontWeightTitle}
        fontColor={data.accueilProps.AccueilColorTitle}
      />
      
      <UpdateText
        isPublished={isPublished}
        value={data.BIO}
        onChange={handleFieldChange(setData, data, 'BIO')}
        containerClass="accueil-text-container"
        textClass="accueil-text-input"
        fontFamilyStyle={data.accueilProps.AccueilFontFamilyBIO}
        fontFamilySize={data.accueilProps.AccueilFontSizeBIO}
        fontFamilyWeight={data.accueilProps.AccueilFontWeightBIO}
        fontColor={data.accueilProps.AccueilColorBIO}
      />

      {/* Social Media Links */}
      <UpdateSocialLinks
        isPublished={isPublished}
        socialLinks={data.accueilSocialLinks || {}}
        onChange={(key, value) =>
          handleNestedFieldChange(setData, data, "accueilSocialLinks", key)(value)
        }
        activeColor={data.accueilProps.AccueilSocialColor}
      />
    </section>
  );
}