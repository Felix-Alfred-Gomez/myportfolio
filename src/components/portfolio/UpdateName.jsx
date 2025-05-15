import React from "react";

export default function UpdateName({ isPublished, name, onChange }) {
  return (
    <div className="accueil-name-container">
      {isPublished ? (
        <span className="accueil-name-text">{name}</span>
      ) : (
        <textarea
          value={name}
          onChange={onChange}
          className="accueil-name-input"
          rows={1}
        />
      )}
    </div>
  );
}