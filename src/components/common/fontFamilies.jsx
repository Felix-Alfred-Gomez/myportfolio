// src/components/common/fontFamilies.js
// A wide variety of popular and web-safe font families for use in dropdowns, etc.

const fontFamilies = [
  { label: "Arial", value: "Arial, sans-serif" },
  { label: "Helvetica", value: "Helvetica, Arial, sans-serif" },
  { label: "Roboto", value: "Roboto, Arial, sans-serif" },
  { label: "Open Sans", value: "'Open Sans', Arial, sans-serif" },
  { label: "Lato", value: "Lato, Arial, sans-serif" },
  { label: "Montserrat", value: "Montserrat, Arial, sans-serif" },
  { label: "Oswald", value: "Oswald, Arial, sans-serif" },
  { label: "Raleway", value: "Raleway, Arial, sans-serif" },
  { label: "Merriweather", value: "Merriweather, serif" },
  { label: "Playfair Display", value: "'Playfair Display', serif" },
  { label: "Times New Roman", value: "'Times New Roman', Times, serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Garamond", value: "Garamond, serif" },
  { label: "Baskerville", value: "Baskerville, serif" },
  { label: "Courier New", value: "'Courier New', Courier, monospace" },
  { label: "Fira Mono", value: "'Fira Mono', monospace" },
  { label: "Consolas", value: "Consolas, monospace" },
  { label: "Menlo", value: "Menlo, monospace" },
  { label: "Comic Sans MS", value: "'Comic Sans MS', cursive, sans-serif" },
  { label: "Brush Script MT", value: "'Brush Script MT', cursive, sans-serif" },
  { label: "Impact", value: "Impact, Charcoal, sans-serif" },
  { label: "Trebuchet MS", value: "'Trebuchet MS', sans-serif" },
  { label: "Verdana", value: "Verdana, Geneva, sans-serif" },
  { label: "Tahoma", value: "Tahoma, Geneva, sans-serif" },
  { label: "Lucida Console", value: "'Lucida Console', Monaco, monospace" },
  { label: "Lucida Sans", value: "'Lucida Sans Unicode', 'Lucida Grande', sans-serif" },
  { label: "Palatino", value: "Palatino, 'Palatino Linotype', serif" },
  { label: "Franklin Gothic Medium", value: "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif" },
  { label: "Century Gothic", value: "'Century Gothic', Arial, sans-serif" },
  { label: "Candara", value: "Candara, Calibri, Segoe, 'Segoe UI', Optima, Arial, sans-serif" },
  { label: "Optima", value: "Optima, Segoe, 'Segoe UI', Candara, Calibri, Arial, sans-serif" },
  { label: "Geneva", value: "Geneva, Tahoma, Verdana, sans-serif" },
  { label: "sans-serif", value: "sans-serif" },
  { label: "serif", value: "serif" },
  { label: "monospace", value: "monospace" },
  { label: "cursive", value: "cursive" },
  { label: "PT Sans", value: "'PT Sans', Arial, sans-serif" },
  { label: "Source Sans Pro", value: "'Source Sans Pro', Arial, sans-serif" },
  { label: "Nunito", value: "Nunito, Arial, sans-serif" },
  { label: "Quicksand", value: "Quicksand, Arial, sans-serif" },
  { label: "Ubuntu", value: "Ubuntu, Arial, sans-serif" },
  { label: "Muli", value: "Muli, Arial, sans-serif" },
  { label: "Poppins", value: "Poppins, Arial, sans-serif" },
  { label: "Josefin Sans", value: "'Josefin Sans', Arial, sans-serif" },
  { label: "Cabin", value: "Cabin, Arial, sans-serif" },
  { label: "Dosis", value: "Dosis, Arial, sans-serif" },
  { label: "Exo", value: "Exo, Arial, sans-serif" },
  { label: "Titillium Web", value: "'Titillium Web', Arial, sans-serif" },
  { label: "Karla", value: "Karla, Arial, sans-serif" },
  { label: "Rubik", value: "Rubik, Arial, sans-serif" },
  { label: "Maven Pro", value: "'Maven Pro', Arial, sans-serif" },
  { label: "Fjalla One", value: "'Fjalla One', Arial, sans-serif" },
  { label: "Bebas Neue", value: "'Bebas Neue', Arial, sans-serif" },
  { label: "Pacifico", value: "Pacifico, cursive, sans-serif" },
  { label: "Dancing Script", value: "'Dancing Script', cursive, sans-serif" },
  { label: "Indie Flower", value: "'Indie Flower', cursive, sans-serif" },
  { label: "Shadows Into Light", value: "'Shadows Into Light', cursive, sans-serif" },
  { label: "Amatic SC", value: "'Amatic SC', cursive, sans-serif" },
  { label: "Permanent Marker", value: "'Permanent Marker', cursive, sans-serif" },
  { label: "Special Elite", value: "'Special Elite', cursive, sans-serif" },
  { label: "Space Mono", value: "'Space Mono', monospace" },
  { label: "IBM Plex Mono", value: "'IBM Plex Mono', monospace" },
  { label: "JetBrains Mono", value: "'JetBrains Mono', monospace" },
  { label: "Inconsolata", value: "Inconsolata, monospace" },
  { label: "Zilla Slab", value: "'Zilla Slab', serif" },
  { label: "Crimson Text", value: "'Crimson Text', serif" },
  { label: "Libre Baskerville", value: "'Libre Baskerville', serif" },
  { label: "Arvo", value: "Arvo, serif" },
  { label: "Lora", value: "Lora, serif" },
  { label: "Play", value: "Play, sans-serif" },
  { label: "Archivo Narrow", value: "'Archivo Narrow', sans-serif" },
  { label: "Asap", value: "Asap, sans-serif" },
  { label: "Barlow", value: "Barlow, sans-serif" },
  { label: "Heebo", value: "Heebo, sans-serif" },
  { label: "Mukta", value: "Mukta, sans-serif" },
  { label: "Overpass", value: "Overpass, sans-serif" },
  { label: "Work Sans", value: "'Work Sans', sans-serif" },
  { label: "Press Start 2P", value: "'Press Start 2P', cursive, sans-serif" },
  { label: "Fredericka the Great", value: "'Fredericka the Great', cursive, serif" },
  { label: "Bangers", value: "Bangers, cursive, sans-serif" },
  { label: "Luckiest Guy", value: "'Luckiest Guy', cursive, sans-serif" },
  { label: "Rock Salt", value: "'Rock Salt', cursive, sans-serif" },
  { label: "Gloria Hallelujah", value: "'Gloria Hallelujah', cursive, sans-serif" },
  { label: "Chewy", value: "Chewy, cursive, sans-serif" },
  { label: "Caveat", value: "Caveat, cursive, sans-serif" },
  { label: "Satisfy", value: "Satisfy, cursive, sans-serif" },
  { label: "Monoton", value: "Monoton, cursive, sans-serif" },
  { label: "Orbitron", value: "Orbitron, sans-serif" },
  { label: "Audiowide", value: "Audiowide, cursive, sans-serif" },
  { label: "VT323", value: "VT323, monospace" },
  { label: "Creepster", value: "Creepster, cursive, sans-serif" },
  { label: "Indie Flower Dots", value: "'Indie Flower', 'DotGothic16', cursive, sans-serif" },
  { label: "Finger Paint", value: "'Finger Paint', cursive, sans-serif" },
  { label: "Just Another Hand", value: "'Just Another Hand', cursive, sans-serif" },
  { label: "Love Ya Like A Sister", value: "'Love Ya Like A Sister', cursive, sans-serif" },
  { label: "Mountains of Christmas", value: "'Mountains of Christmas', cursive, serif" },
  { label: "Rye", value: "Rye, cursive, serif" },
  { label: "UnifrakturCook", value: "UnifrakturCook, cursive, serif" },
  { label: "ZCOOL KuaiLe", value: "'ZCOOL KuaiLe', cursive, sans-serif" }
];

export default fontFamilies;
