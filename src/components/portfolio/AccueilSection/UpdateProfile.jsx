import { useRef } from "react";

export default function UpdateProfile({ profilePic, handleProfileUpload, isPublished }) {
  const profileInputRef = useRef();

  const handleProfileClick = () => {
    if (!isPublished && profileInputRef.current) {
      profileInputRef.current.click();
    }
  };

  return (
    <div className="accueil-profile-pic-wrapper" onClick={handleProfileClick}>
      <img
        src={profilePic}
        alt=""
        className="accueil-profile-img"
        style={{ cursor: isPublished ? "default" : "pointer" }}
        title={isPublished ? "" : "Changer la photo de profil"}
      />
      <input
        type="file"
        accept="image/*"
        ref={profileInputRef}
        style={{ display: "none" }}
        onChange={(event) => handleProfileUpload(event)}
        disabled={isPublished}
      />
    </div>
  );
}