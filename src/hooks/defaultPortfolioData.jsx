// Default portfolio data constants

// Number of default projects
export const DEFAULT_PROJECTS_COUNT = 8;

// Default subcategories for each project
export const defaultProject = {
  Title: "Titre du projet",
  Text: "Description du projet",
  Link: "",
  Skills: "Competence_1, Competence_2, Competence_3",
};

// Default portfolio data structure
export const defaultPortfolioData = {
  // UserURL: "None",
  name: "Votre Nom",
  BIO: "Votre statut",
  navProps: {
    navBarColor: "#000000",
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
    AccueilSocialColor: "#ffffff",
  },
  accueilSocialLinks: {
    linkedin: "",
    github: "",
    gitlab: "",
    twitter: "",
    instagram: "",
    youtube: "",
    medium: "",
    website: "",
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

    FontFamilySkills: "'IBM Plex Sans', sans-serif",
    FontSizeSkills: "12px",
    FontWeightSkills: "bold",
    ColorSkills: "#FFFFFF",
    ColorSkillsBox: "#FF4949",

    BackgroundColor: "#f3f3f3",
    HoverColor: "#f3f3f3",
  },
};
