import React from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";

export default function UpdateBackground({ onUpload, disabled }) {
  const bgInputRef = React.useRef();

  return (
    <div
      className="accueil-upload-icon"
      onClick={() => !disabled && bgInputRef.current && bgInputRef.current.click()}
      style={{ cursor: disabled ? "default" : "pointer" }}
      title="Changer l'image de fond"
    >
      <ArrowUpTrayIcon />
      <input
        type="file"
        accept="image/*"
        ref={bgInputRef}
        style={{ display: "none" }}
        onChange={onUpload}
        disabled={disabled}
      />
    </div>
  );
}