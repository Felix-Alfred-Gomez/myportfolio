import { usePortfolioImage } from "../../../hooks/HandlePortfolioImage";
import "../../../styles/PortfolioTemplate.css";
import UpdateBackground from "../../common/UpdateBackground";
import UpdateProfile from "./UpdateProfile";
import UpdateText from "./UpdateText";
import { handleFieldChange } from '../../../hooks/HandlePortfolioData';

export default function AccueilSection({ username, isPublished, data, setData }) {
  const { imageUrl: profilePic, handleImageUpload: handleProfileUpload } = usePortfolioImage(username, "Profile");
  const { imageUrl: backgroundUrl, handleImageUpload: handleBackgroundUpload } = usePortfolioImage(username, "AccueilBackground");

// Suppression de fieldChangeHandler, utilisation directe de handleFieldChange
  return (
    <section
      id="home"
      className="accueil-section"
      style={backgroundUrl ? { backgroundImage: `url(${backgroundUrl})`,
      backgroundSize: "cover", backgroundPosition: "center" } : {}}>
      
      {/* Upload icon in top right */}
      {!isPublished && (
        <UpdateBackground 
          onUpload={handleBackgroundUpload} 
          disabled={isPublished} />
      )}

      <UpdateProfile
        profilePic={profilePic}
        onUpload={handleProfileUpload}
        disabled={isPublished}/>
      
      <UpdateText
        isPublished={isPublished}
        value={data.name}
        onChange={handleFieldChange(setData, data, 'name')}
        containerClass="accueil-text-container accueil-name-container"
        textClass="accueil-text"
        inputClass="accueil-text-input"/>
      
      <UpdateText
        isPublished={isPublished}
        value={data.BIO}
        onChange={handleFieldChange(setData, data, 'BIO')}
        containerClass="accueil-text-container accueil-BIO-container"
        textClass="accueil-text"
        inputClass="accueil-text-input"/>

    </section>
  );
}