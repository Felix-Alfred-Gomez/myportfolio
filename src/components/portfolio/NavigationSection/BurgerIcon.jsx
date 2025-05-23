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

  const circleStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: "50%",
    border: `2px solid ${circleColor}`,
    boxSizing: "border-box",
    background: circleColor,
  };
  const barStyle = {
    backgroundColor: navLinkColor,
    width: 25,
    height: 4,
    borderRadius: 3,
  };
  return (
    <div
      ref={ref}
      className={`burger-icon${isOpen ? " open" : ""}`}
      onClick={onClick}
      aria-label="Ouvrir le menu"
      tabIndex={0}
      role="button"
    >
      <div style={circleStyle}>
        <div style={barStyle} />
        <div style={{ ...barStyle, margin: "8px 0" }} />
        <div style={barStyle} />
      </div>
    </div>
  );
});

export default BurgerIcon;