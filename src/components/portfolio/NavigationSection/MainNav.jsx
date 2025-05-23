export default function MainNav() {
  return (
    <nav className="nav-template">
      <a className="portfolio-anchor" href="#home">Accueil</a>
      <a
        className="portfolio-anchor"
        href="#skills"
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