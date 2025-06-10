// Utility to get responsive font size (66% for mobile screens)
export function getResponsiveFontSize(fontFamilySize, windowWidth) {
  // Use windowWidth if provided, otherwise fallback to window.innerWidth
  const width =
    typeof windowWidth === "number"
      ? windowWidth
      : typeof window !== "undefined"
      ? window.innerWidth
      : undefined;
  if (typeof width === "number" && width <= 600) {
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
