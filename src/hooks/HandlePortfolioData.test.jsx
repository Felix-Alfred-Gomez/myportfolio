import { deepMerge } from "./HandlePortfolioData";

describe("deepMerge", () => {
  it("should merge flat objects", () => {
    const target = { a: 1, b: 2 };
    const source = { b: 3, c: 4 };
    expect(deepMerge(target, source)).toEqual({ a: 1, b: 3, c: 4 });
  });

  it("should deep merge nested objects", () => {
    const target = { a: { x: 1, y: 2 }, b: 2 };
    const source = { a: { y: 3, z: 4 }, c: 5 };
    expect(deepMerge(target, source)).toEqual({ a: { x: 1, y: 3, z: 4 }, b: 2, c: 5 });
  });

  it("should overwrite arrays instead of merging them", () => {
    const target = { a: [1, 2], b: 2 };
    const source = { a: [3, 4] };
    expect(deepMerge(target, source)).toEqual({ a: [3, 4], b: 2 });
  });

  it("should handle null and undefined in source", () => {
    const target = { a: 1, b: 2 };
    const source = { a: null, b: undefined };
    expect(deepMerge(target, source)).toEqual({ a: null, b: undefined });
  });

  it("should return a shallow copy if source is not an object", () => {
    const target = { a: 1 };
    expect(deepMerge(target, null)).toEqual({ a: 1 });
    expect(deepMerge(target, undefined)).toEqual({ a: 1 });
    expect(deepMerge(target, 42)).toEqual({ a: 1 });
    expect(deepMerge(target, "string")).toEqual({ a: 1 });
  });

  it("should not mutate the original target or source", () => {
    const target = { a: { b: 1 } };
    const source = { a: { c: 2 } };
    const result = deepMerge(target, source);
    expect(result).toEqual({ a: { b: 1, c: 2 } });
    expect(target).toEqual({ a: { b: 1 } });
    expect(source).toEqual({ a: { c: 2 } });
  });
});
