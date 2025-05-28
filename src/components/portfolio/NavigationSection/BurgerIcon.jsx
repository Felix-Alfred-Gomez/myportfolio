import { forwardRef } from "react";
import hexToRgba from "../../common/hexToRgba";
import "../../../styles/NavSection.css";

const BurgerIcon = forwardRef(function BurgerIcon({ onClick, isOpen, navProps }, ref) {
  const { navBarColor, navLinkColor, navBarAlpha } = navProps;
  let circleColor = navBarColor;
  if (navBarColor && navBarColor[0] === "#" && typeof navBarAlpha !== "undefined") {
    circleColor = hexToRgba(navBarColor, navBarAlpha);
  }

  // Use CSS classes for layout, set only color/border inline
  return (
    <div
      ref={ref}
      className={`burger-icon${isOpen ? " open" : ""}`}
      onClick={onClick}
      aria-label="Ouvrir le menu"
      tabIndex={0}
      role="button"
    >
      <div
        className="burger-circle"
        style={{ border: `2px solid ${circleColor}`, background: circleColor }}
      >
        <div className="burger-bar" style={{ backgroundColor: navLinkColor }} />
        <div className="burger-bar" style={{ backgroundColor: navLinkColor, margin: "8px 0" }} />
        <div className="burger-bar" style={{ backgroundColor: navLinkColor }} />
      </div>
    </div>
  );
});

export default BurgerIcon;