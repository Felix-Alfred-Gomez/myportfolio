import React, { forwardRef } from "react";

const BurgerIcon = forwardRef(function BurgerIcon({ onClick, isOpen, navBarColor, navLinkColor, navBarAlpha }, ref) {
  // Helper to convert hex to rgba with alpha
  function hexToRgba(hex, alpha = 1) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

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