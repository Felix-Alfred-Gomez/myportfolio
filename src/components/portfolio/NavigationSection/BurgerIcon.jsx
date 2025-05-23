import React, { forwardRef } from "react";

const BurgerIcon = forwardRef(function BurgerIcon({ onClick, isOpen, navBarColor }, ref) {
  const barStyle = {
    backgroundColor: navBarColor,
    width: 40,
    height: 6,
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
      <div style={barStyle} />
      <div style={barStyle} />
      <div style={barStyle} />
    </div>
  );
});

export default BurgerIcon;