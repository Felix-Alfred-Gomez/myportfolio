import NavOptionsModal from "./NavOptionsModal";
import BurgerIcon from "./BurgerIcon";
import SideMenu from "./SideMenu";
import MainNav from "./MainNav";
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { useState } from "react";

export default function PortfolioNavWrapper({
  showDesignModal,
  setShowDesignModal,
  menuOpen,
  setMenuOpen,
  menuRef,
  burgerRef,
  navBarColor,
  setNavBarColor,
  navLinkColor,
  setNavLinkColor,
  isPublished // <-- Add this prop
}) {
  // Add navBarAlpha state
  const [navBarAlpha, setNavBarAlpha] = useState(1);

  // Helper to get RGBA color for navBar
  function getNavBarRgba() {
    if (!navBarColor) return undefined;
    // Convert hex to rgba
    const hex = navBarColor.replace('#', '');
    if (hex.length !== 6) return navBarColor;
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r},${g},${b},${navBarAlpha})`;
  }

  return (
    <>
      {!isPublished && (
        <button
          className="button-template-option-wheel"
          title="Options"
          onClick={() => setShowDesignModal(true)}>
          <Cog6ToothIcon className="option-wheel-icon" />
        </button>
      )}

      {/* Design Options Modal */}
      <NavOptionsModal
        show={showDesignModal}
        onClose={() => setShowDesignModal(false)}
        navBarColor={navBarColor}
        setNavBarColor={setNavBarColor}
        navLinkColor={navLinkColor}
        setNavLinkColor={setNavLinkColor}
        navBarAlpha={navBarAlpha}
        setNavBarAlpha={setNavBarAlpha}
      />

      {/* Burger Icon */}
      <BurgerIcon
        ref={burgerRef}
        onClick={() => setMenuOpen(!menuOpen)}
        isOpen={menuOpen}
        navBarColor={navBarColor}
        navBarAlpha={navBarAlpha}
        navLinkColor={navLinkColor}
      />

      {/* Side menu */}
      <SideMenu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        menuRef={menuRef}
        burgerRef={burgerRef}
        navBarColor={navBarColor}
        navLinkColor={navLinkColor}
      />

      {/* Main Navigation */}
      <MainNav navBarColor={getNavBarRgba()} navLinkColor={navLinkColor} />
    </>
  );
}
