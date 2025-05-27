import hexToRgba from "../../common/hexToRgba";

export default function MainNav({ navProps }) {
  const { navBarColor, navLinkColor, navBarAlpha, navFontFamily, navFontSize, navFontWeight} = navProps;
  
  console.log('navBarColor:', navBarColor);
  console.log('navLinkColor:', navLinkColor);
  console.log('navBarAlpha:', navBarAlpha);
  console.log('navFontFamily:', navFontFamily);
  console.log('navFontSize:', navFontSize);
  console.log('navFontWeight:', navFontWeight);

  const navStyle = {};
  navStyle.backgroundColor = hexToRgba(navBarColor, navBarAlpha);
  navStyle.fontFamily = navFontFamily;

  return (
    <nav
      className="nav-template"
      style={navStyle}
    >
      <a
        className="portfolio-anchor"
        href="#home"
        style={{
          color: navLinkColor,
          fontSize: navFontSize,
          fontWeight: navFontWeight
        }}
      >
        Accueil
      </a>
      <a
        className="portfolio-anchor"
        href="#skills"
        style={{
          color: navLinkColor,
          fontSize: navFontSize,
          fontWeight: navFontWeight
        }}
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("skills").scrollIntoView({ behavior: "smooth" });
        }}
      >
        Compétences
      </a>
    </nav>
  );
}