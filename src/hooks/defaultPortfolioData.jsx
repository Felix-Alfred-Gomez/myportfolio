// Default portfolio data constants

// Number of default projects
export const DEFAULT_PROJECTS_COUNT = 8;

// Default subcategories for each project
export const defaultProject = {
  Title: "Titre du projet",
  Text: "Description du projet",
  Tech: ["Tech 1", "Tech 2", "Tech 3", "Tech 4",
    "Tech 5", "Tech 6", "Tech 7", "Tech 8"],
  Link: "",
};

// Default portfolio data structure
export const defaultPortfolioData = {
  name: "Votre Nom",
  BIO: "Votre statut",
  navProps: {
    navBarColor: "grey",
    navLinkColor: "#ffffff",
    navBarAlpha: 0.5,
    navFontFamily: "Arial, sans-serif",
    navFontSize: "25px",
    navFontWeight: "bold",
  },
  accueilProps: {
    AccueilFontFamilyTitle: "Arial, sans-serif",
    AccueilFontSizeTitle: "30px",
    AccueilFontWeightTitle: "bold",
    AccueilColorTitle: "#ffffff",
    AccueilFontFamilyBIO: "Arial, sans-serif",
    AccueilFontSizeBIO: "20px",
    AccueilColorBIO: "#ffffff",
    AccueilFontWeightBIO: "normal",
  },
  projects: Array.from({ length: DEFAULT_PROJECTS_COUNT }, () => ({ ...defaultProject })),
  projetProps: {
    NbProjectsUser: 1,
    FontFamilyTitle: "Arial, sans-serif",
    FontSizeTitle: "20px",
    FontWeightTitle: "bold",
    ColorTitle: "#000000",
    FontFamilyText: "Arial, sans-serif",
    FontSizeText: "15px",
    FontWeightText: "bold",
    ColorText: "#000000",
    FontFamilyTech: "Arial, sans-serif",
    FontSizeTech: "15px",
    FontWeightTech: "bold",
    BackgroundColor: "#ffffff",
    HoverColor: "#d3d3d3", // light grey
  },
};
