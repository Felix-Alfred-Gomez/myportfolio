// Utility to get responsive font size (66% for mobile screens)
export function getResponsiveFontSize(fontFamilySize) {
  if (typeof window !== "undefined" && window.innerWidth <= 600) {
    let size = fontFamilySize;
    if (typeof size === "string" && size.endsWith("px")) {
      return parseFloat(size) * 0.66 + "px";
    } else if (typeof size === "number") {
      return size * 0.66;
    }
    return size;
  }
  return fontFamilySize;
}
