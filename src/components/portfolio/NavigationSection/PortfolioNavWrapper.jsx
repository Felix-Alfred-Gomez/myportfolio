import NavOptionsModal from "./NavOptionsModal";
import BurgerIcon from "./BurgerIcon";
import SideMenu from "./SideMenu";
import MainNav from "./MainNav";
import { Cog6ToothIcon } from '@heroicons/react/24/solid';

export default function PortfolioNavWrapper({
  showDesignModal,
  setShowDesignModal,
  menuOpen,
  setMenuOpen,
  menuRef,
  burgerRef
}) {
  return (
    <>
      <button
        className="button-template-option-wheel"
        title="Options"
        onClick={() => setShowDesignModal(true)}>
        <Cog6ToothIcon className="option-wheel-icon" />
      </button>

      {/* Design Options Modal */}
      <NavOptionsModal
        show={showDesignModal}
        onClose={() => setShowDesignModal(false)}
      />

      {/* Burger Icon */}
      <BurgerIcon
        ref={burgerRef}
        onClick={() => setMenuOpen(!menuOpen)}
        isOpen={menuOpen}
      />

      {/* Side menu */}
      <SideMenu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        menuRef={menuRef}
        burgerRef={burgerRef}
      />

      {/* Main Navigation */}
      <MainNav />
    </>
  );
}
