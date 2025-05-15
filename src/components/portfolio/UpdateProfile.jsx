import React from "react";

export default function UpdateProfile({ profilePic, onUpload, disabled }) {
  return (
    <div className="accueil-profile-pic-wrapper">
      <input
        type="file"
        accept="image/*"
        onChange={onUpload}
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
          Upload
        </div>
      )}
    </div>
  );
}