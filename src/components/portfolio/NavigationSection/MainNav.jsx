import hexToRgba from "../../common/hexToRgba";

export default function MainNav({ navProps }) {
  const { navBarColor, navLinkColor, navBarAlpha, navFontFamily } = navProps;
  const navStyle = {};
  if (navBarColor) navStyle.backgroundColor = hexToRgba(navBarColor, navBarAlpha);
  if (navFontFamily) navStyle.fontFamily = navFontFamily;
  return (
    <nav
      className="nav-template"
      style={navStyle}
    >
      <a
        className="portfolio-anchor"
        href="#home"
        style={navLinkColor ? { color: navLinkColor } : {}}
      >
        Accueil
      </a>
      <a
        className="portfolio-anchor"
        href="#skills"
        style={navLinkColor ? { color: navLinkColor } : {}}
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