import React, { useEffect } from "react";

export default function SideMenu({ menuOpen, setMenuOpen, menuRef, burgerRef, navProps }) {
  const { navBarColor, navLinkColor, navFontFamily } = navProps;

  useEffect(() => {
    if (!menuOpen) return;

    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        burgerRef.current &&
        !burgerRef.current.contains(event.target)
      ) {
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
  }, [menuOpen, setMenuOpen, menuRef, burgerRef]);

  const menuStyle = {};
  if (navBarColor) menuStyle.backgroundColor = navBarColor;
  if (navFontFamily) menuStyle.fontFamily = navFontFamily;

  return (
    <div
      ref={menuRef}
      className={`side-menu ${menuOpen ? "open" : ""}`}
      style={menuStyle}
    >
      <a
        href="#home"
        onClick={() => setMenuOpen(false)}
        style={navLinkColor ? { color: navLinkColor } : {}}
      >
        Accueil
      </a>
      <a
        href="#skills"
        onClick={e => {
          e.preventDefault();
          document.getElementById("skills").scrollIntoView({ behavior: "smooth" });
          setMenuOpen(false);
        }}
        style={navLinkColor ? { color: navLinkColor } : {}}
      >
        Compétences
      </a>
    </div>
  );
}