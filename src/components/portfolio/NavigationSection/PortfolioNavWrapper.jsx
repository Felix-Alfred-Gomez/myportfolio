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
  burgerRef,
  navProps,
  setData,
  isPublished,
  data
}) 

  {
  // Updater functions for navProps
  const setNavBarColor = (barcolor) => setData({
    ...data,
    navProps: { ...data.navProps, navBarColor: barcolor }
  });
  const setNavLinkColor = (linkcolor) => setData({
    ...data,
    navProps: { ...data.navProps, navLinkColor: linkcolor }
  });
  const setNavBarAlpha = (alpha) => setData({
    ...data,
    navProps: { ...data.navProps, navBarAlpha: alpha }
  });

  const navPropsWithSetters = {
    ...navProps,
    setNavBarColor,
    setNavLinkColor,
    setNavBarAlpha
  };

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
        navPropsWithSetters={navPropsWithSetters}
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
