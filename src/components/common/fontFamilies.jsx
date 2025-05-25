// Add fonts with https://fonts.google.com/ is needed

const fontFamilies = [
  { label: "Amatic SC", value: "'Amatic SC', cursive" },
  { label: "Arial", value: "Arial, sans-serif" },
  { label: "Balsamiq Sans", value: "'Balsamiq Sans', cursive" },
  { label: "Cinzel", value: "Cinzel, serif" },
  { label: "Comic Neue", value: "'Comic Neue', cursive" },
  { label: "Cormorant Garamond", value: "'Cormorant Garamond', serif" },
  { label: "Crimson Text", value: "'Crimson Text', serif" },
  { label: "Dancing Script", value: "'Dancing Script', cursive" },
  { label: "EB Garamond", value: "'EB Garamond', serif" },
  { label: "Fredoka", value: "Fredoka, cursive" },
  { label: "Gloria Hallelujah", value: "'Gloria Hallelujah', cursive" },
  { label: "Great Vibes", value: "'Great Vibes', cursive" },
  { label: "Helvetica", value: "Helvetica, Arial, sans-serif" },
  { label: "IBM Plex Sans", value: "'IBM Plex Sans', sans-serif" },
  { label: "Indie Flower", value: "'Indie Flower', cursive" },
  { label: "Inter", value: "Inter, sans-serif" },
  { label: "Lato", value: "Lato, sans-serif" },
  { label: "Love Ya Like A Sister", value: "'Love Ya Like A Sister', cursive" },
  { label: "Luckiest Guy", value: "'Luckiest Guy', cursive" },
  { label: "Merriweather", value: "Merriweather, serif" },
  { label: "Monoton", value: "Monoton, cursive" },
  { label: "Noto Serif", value: "'Noto Serif', serif" },
  { label: "Open Sans", value: "'Open Sans', sans-serif" },
  { label: "Patrick Hand", value: "'Patrick Hand', cursive" },
  { label: "Playfair Display", value: "'Playfair Display', serif" },
  { label: "Rye", value: "Rye, cursive, serif" },
  { label: "Raleway", value: "Raleway, sans-serif" },
  { label: "Roboto", value: "Roboto, sans-serif" },
  { label: "Shadows Into Light", value: "'Shadows Into Light', cursive" },
  { label: "Source Serif Pro", value: "'Source Serif Pro', serif" },
  { label: "Special Elite", value: "'Special Elite', cursive" },
  { label: "Times New Roman", value: "'Times New Roman', Times, serif" },
  { label: "Varela Round", value: "'Varela Round', sans-serif" },
  { label: "ZCOOL KuaiLe", value: "'ZCOOL KuaiLe', cursive" },
  { label: "Zilla Slab", value: "'Zilla Slab', serif" },
];

// List of system fonts to exclude from Google Fonts import
const systemFonts = [
  "Arial", "Helvetica", "Times New Roman"
];

// Helper: Extract Google Fonts from the list
export const googleFontFamilies = fontFamilies
  .map(f => f.label)
  .filter(label => !systemFonts.includes(label));

// Helper: Generate Google Fonts import URL
export function getGoogleFontsImportUrl() {
  const families = googleFontFamilies.map(f => f.replace(/ /g, '+')).join('&family=');
  return `https://fonts.googleapis.com/css2?family=${families}&display=swap`;
}

export default fontFamilies;
