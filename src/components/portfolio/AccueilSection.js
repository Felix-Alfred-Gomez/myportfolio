import { usePortfolioPicture } from "../../hooks/HandlePortfolioPicture";
import "../../styles/PortfolioTemplate1.css";

export default function AccueilSection({ username, isPublished, data, setData }) {
  const { profilePic, handleImageUpload } = usePortfolioPicture(username);

  const handleNameChange = (e) => {
    setData({ ...data, name: e.target.value });
  };

  return (
    <section id="home" className="accueil-section">
      <div className="accueil-profile-pic-wrapper">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={isPublished}
          className="accueil-profile-input"
        />
        {profilePic ? (
          <img
            src={profilePic}
            alt="Profile"
            className="accueil-profile-img"
          />
        ) : (
          <div className="accueil-profile-placeholder">
            Upload
          </div>
        )}
      </div>

      <div className="accueil-name-container">
        {isPublished ? (
          <span className="accueil-name-text">{data.name}</span>
        ) : (
        <textarea
          value={data.name}
          onChange={(e) => {
            handleNameChange(e);
            e.target.style.height = "auto"; // Reset height
            e.target.style.height = `${e.target.scrollHeight}px`; // Grow to fit
          }}
          className="accueil-name-input"
        />
        )}
      </div>
      {/* <p className="accueil-desc">
        Faites défiler pour découvrir les compétences.
      </p> */}
    </section>
  );
}