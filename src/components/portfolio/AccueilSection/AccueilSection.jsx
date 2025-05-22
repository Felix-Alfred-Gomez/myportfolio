import { usePortfolioImage } from "../../../hooks/HandlePortfolioImage";
import "../../../styles/PortfolioTemplate.css";
import UpdateBackground from "../../common/UpdateBackground";
import UpdateProfile from "./UpdateProfile";
import UpdateText from "./UpdateText";

export default function AccueilSection({ username, isPublished, data, setData }) {
  const { imageUrl: profilePic, handleImageUpload: handleProfileUpload } = usePortfolioImage(username, "Profile");
  const { imageUrl: backgroundUrl, handleImageUpload: handleBackgroundUpload } = usePortfolioImage(username, "AccueilBackground");

  const handleNameChange = (e) => {
    setData({ ...data, name: e.target.value });
  };

  const handleBIOChange = (e) => {
    setData({ ...data, BIO: e.target.value });
  };

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
        onChange={handleNameChange}
        containerClass="accueil-text-container accueil-name-container"
        textClass="accueil-text"
        inputClass="accueil-text-input"/>
      
      <UpdateText
        isPublished={isPublished}
        value={data.BIO}
        onChange={handleBIOChange}
        containerClass="accueil-text-container accueil-BIO-container"
        textClass="accueil-text"
        inputClass="accueil-text-input"/>

    </section>
  );
}