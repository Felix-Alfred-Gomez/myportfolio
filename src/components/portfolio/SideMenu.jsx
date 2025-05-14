import React, { useRef, useEffect } from "react";

export default function SideMenu({ menuOpen, setMenuOpen }) {
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;

    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    function handleResize() {
      setMenuOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, [menuOpen, setMenuOpen]);

  return (
    <div ref={menuRef} className={`side-menu ${menuOpen ? "open" : ""}`}>
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