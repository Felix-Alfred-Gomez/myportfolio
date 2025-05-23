import React, { forwardRef } from "react";

const BurgerIcon = forwardRef(function BurgerIcon({ onClick, isOpen, navBarColor }, ref) {
  return (
    <div
      ref={ref}
      className={`burger-icon${isOpen ? " open" : ""}`}
      onClick={onClick}
      aria-label="Ouvrir le menu"
      tabIndex={0}
      role="button"
    >
      <div style={{ backgroundColor: navBarColor }} />
      <div style={{ backgroundColor: navBarColor }} />
      <div style={{ backgroundColor: navBarColor }} />
    </div>
  );
});

export default BurgerIcon;