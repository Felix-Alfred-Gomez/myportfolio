import { usePortfolioImage } from "../../../hooks/HandlePortfolioImage";
import "../../../styles/PortfolioTemplate.css";
import UpdateBackground from "./UpdateBackground";
import UpdateProfile from "./UpdateProfile";
import UpdateName from "./UpdateName";

export default function AccueilSection({ username, isPublished, data, setData }) {
  const { imageUrl: profilePic, handleImageUpload: handleProfileUpload } = usePortfolioImage(username, "Profile");
  const { imageUrl: backgroundUrl, handleImageUpload: handleBackgroundUpload } = usePortfolioImage(username, "AccueilBackground");

  const handleNameChange = (e) => {
    setData({ ...data, name: e.target.value });
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
        disabled={isPublished}
      />

      <UpdateName
        isPublished={isPublished}
        name={data.name}
        onChange={handleNameChange}
      />
      <p className="accueil-BIO">
        Faites défiler pour découvrir les compétences.
      </p>
    </section>
  );
}