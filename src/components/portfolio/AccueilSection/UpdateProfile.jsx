export default function UpdateProfile({ profilePic, onUpload, disabled }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB size check
        window.alert("Image size must be less than 5MB.");
        return;
      }
      onUpload(event);
    }
  };

  return (
    <div className="accueil-profile-pic-wrapper">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={disabled}
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
          Charger une image
        </div>
      )}
    </div>
  );
}