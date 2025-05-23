// Utility to convert hex color to rgba string
export default function hexToRgba(hex, alpha = 1) {
  if (!hex || typeof hex !== "string") return hex;
  const cleanHex = hex.replace("#", "");
  if (cleanHex.length !== 6) return hex;
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
