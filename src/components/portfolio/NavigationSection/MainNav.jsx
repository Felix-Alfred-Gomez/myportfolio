export default function MainNav({ navBarColor, navLinkColor }) {
  return (
    <nav
      className="nav-template"
      style={navBarColor ? { backgroundColor: navBarColor } : {}}
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