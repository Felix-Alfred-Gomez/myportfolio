import React, { useRef } from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";

export default function UpdateBackground({ onUpload, disabled }) {
  const bgInputRef = useRef();

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
    <div className="accueil-upload-background-wrapper">
      <div
        className="accueil-upload-background"
        onClick={() => !disabled && bgInputRef.current && bgInputRef.current.click()}
        style={{ cursor: disabled ? "default" : "pointer" }}
        title="Changer l'image de fond">
        <ArrowUpTrayIcon />
        <input
          type="file"
          accept="image/*"
          ref={bgInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
}