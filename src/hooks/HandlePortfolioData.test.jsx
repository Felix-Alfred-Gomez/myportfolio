import { deepMerge, pruneExtraKeys } from "./HandlePortfolioData";

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

describe("pruneExtraKeys", () => {
  it("should remove keys not present in the reference object (flat)", () => {
    const target = { a: 1, b: 2, extra: 99 };
    const reference = { a: 0, b: 0 };
    expect(pruneExtraKeys(target, reference)).toEqual({ a: 1, b: 2 });
  });

  it("should remove nested extra keys", () => {
    const target = { a: { x: 1, y: 2, z: 3 }, b: 2 };
    const reference = { a: { x: 0, y: 0 }, b: 0 };
    expect(pruneExtraKeys(target, reference)).toEqual({ a: { x: 1, y: 2 }, b: 2 });
  });

  it("should prune arrays of objects", () => {
    const target = [{ a: 1, extra: 2 }, { a: 2, b: 3 }];
    const reference = [{ a: 0 }, { a: 0, b: 0 }];
    expect(pruneExtraKeys(target, reference)).toEqual([{ a: 1 }, { a: 2, b: 3 }]);
  });

  it("should handle arrays with more items in target than reference", () => {
    const target = [{ a: 1 }, { a: 2 }, { a: 3 }];
    const reference = [{ a: 0 }];
    expect(pruneExtraKeys(target, reference)).toEqual([{ a: 1 }]);
  });

  it("should return primitives as is", () => {
    expect(pruneExtraKeys(42, 0)).toBe(42);
    expect(pruneExtraKeys("foo", "bar")).toBe("foo");
  });
});
