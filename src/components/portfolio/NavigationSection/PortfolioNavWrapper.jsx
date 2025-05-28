import NavOptionsModal from "./NavOptionsModal";
import BurgerIcon from "./BurgerIcon";
import SideMenu from "./SideMenu";
import MainNav from "./MainNav";
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import "../../../styles/NavSection.css";

export default function PortfolioNavWrapper({
  showDesignModal,
  setShowDesignModal,
  menuOpen,
  setMenuOpen,
  menuRef,
  burgerRef,
  navProps,
  setData,
  isPublished,
  data
}) 

  {
  // On passe simplement navProps, setData, data, et handleNestedFieldChange directement aux sous-composants si besoin

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
