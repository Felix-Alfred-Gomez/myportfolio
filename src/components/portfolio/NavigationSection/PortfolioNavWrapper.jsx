import NavOptionsModal from "./NavOptionsModal";
import BurgerIcon from "./BurgerIcon";
import SideMenu from "./SideMenu";
import MainNav from "./MainNav";
// import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import "../../../styles/NavSection.css";
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

export default function PortfolioNavWrapper({
  menuOpen,
  setMenuOpen,
  menuRef,
  burgerRef,
  navProps,
  setData,
  isPublished,
  data
}) 

  {const [showDesignModal, setShowDesignModal] = useState(false);
  // On passe simplement navProps, setData, data, et handleNestedFieldChange directement aux sous-composants si besoin

  return (
    <>
      {!isPublished && (
        <button
          className="wheel-option nav zlevel7"
          title="Options"
          onClick={() => setShowDesignModal(true)}>
          <FaPencilAlt className="wheel-icon" />
        </button>
      )}

      {/* Design Options Modal */}
      <NavOptionsModal
        show={showDesignModal}
        onClose={() => setShowDesignModal(false)}
        navProps={navProps}
        setData={setData}
        data={data}
      />

      {/* Burger Icon */}
      <BurgerIcon
        ref={burgerRef}
        onClick={() => setMenuOpen(!menuOpen)}
        isOpen={menuOpen}
        navProps={navProps}
      />

      {/* Side menu */}
      <SideMenu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        menuRef={menuRef}
        burgerRef={burgerRef}
        navProps={navProps}
      />

      {/* Main Navigation */}
      <MainNav navProps={navProps} />
    </>
  );
}
