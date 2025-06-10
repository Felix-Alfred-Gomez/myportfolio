import { getResponsiveFontSize } from "./responsiveFontSize";

describe("getResponsiveFontSize", () => {
  const originalWindow = { ...window };

  afterEach(() => {
    // Restore window.innerWidth after each test
    window.innerWidth = originalWindow.innerWidth;
  });

  it("returns 66% of px string for mobile screens", () => {
    window.innerWidth = 500;
    expect(getResponsiveFontSize("30px")).toBe("19.8px");
  });

  it("returns 66% of number for mobile screens", () => {
    window.innerWidth = 500;
    expect(getResponsiveFontSize(30)).toBeCloseTo(19.8);
  });

  it("returns original px string for desktop screens", () => {
    window.innerWidth = 800;
    expect(getResponsiveFontSize("30px")).toBe("30px");
  });

  it("returns original number for desktop screens", () => {
    window.innerWidth = 800;
    expect(getResponsiveFontSize(30)).toBe(30);
  });

  it("returns original value for unknown type", () => {
    window.innerWidth = 500;
    expect(getResponsiveFontSize("2em")).toBe("2em");
  });
});
