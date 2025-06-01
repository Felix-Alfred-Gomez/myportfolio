export default function UpdateProfile({profilePic}) {
  return (
    <div className="accueil-profile-pic-wrapper">
      {profilePic ? (
        <img
          src={profilePic}
          alt="Profile"
          className="accueil-profile-img"
        />
      ) : (
        <div className="accueil-profile-placeholder">
          Charger une image
        </div>
      )}
    </div>
  );
}