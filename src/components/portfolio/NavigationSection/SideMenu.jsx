import { useEffect } from "react";
import "../../../styles/NavSection.css";

export default function SideMenu({ menuOpen, setMenuOpen, menuRef, burgerRef, navProps }) {
  const { navBarColor, navLinkColor, navFontFamily, navFontSize, navFontWeight } = navProps;

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
  menuStyle.backgroundColor = navBarColor;
  menuStyle.fontFamily = navFontFamily;
  menuStyle.fontSize = navFontSize;
  menuStyle.fontWeight = navFontWeight;

  return (
    <div
      ref={menuRef}
      className={`side-menu ${menuOpen ? "open" : ""}`}
      style={menuStyle}
    >
      <a
        href="#home"
        onClick={() => setMenuOpen(false)}
        style={{
          color: navLinkColor,
          fontSize: navFontSize,
          fontWeight: navFontWeight
        }}
      >
        Accueil
      </a>
      <a
        href="#project"
        onClick={e => {
          e.preventDefault();
          document.getElementById("project").scrollIntoView({ behavior: "smooth" });
          setMenuOpen(false);
        }}
        style={{
          color: navLinkColor,
          fontSize: navFontSize,
          fontWeight: navFontWeight
        }}
      >
        Projets
      </a>
    </div>
  );
}