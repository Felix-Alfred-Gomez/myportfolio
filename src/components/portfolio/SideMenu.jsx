import React from "react";

export default function SideMenu({ menuOpen, setMenuOpen }) {
  return (
    <div className={`side-menu ${menuOpen ? "open" : ""}`}>
      <a href="#home" onClick={() => setMenuOpen(false)}>Accueil</a>
      <a
        href="#skills"
        onClick={e => {
          e.preventDefault();
          document.getElementById("skills").scrollIntoView({ behavior: "smooth" });
          setMenuOpen(false);
        }}
      >
        Compétences
      </a>
    </div>
  );
}