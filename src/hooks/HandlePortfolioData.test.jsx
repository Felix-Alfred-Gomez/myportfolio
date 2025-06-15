// Mock the Firebase methods before any imports
jest.mock("firebase/database", () => {
  const actual = jest.requireActual("firebase/database");
  return {
    ...actual,
    getDatabase: jest.fn(() => ({})),
    ref: jest.fn(() => ({})),
    query: jest.fn(() => ({})),
    orderByChild: jest.fn(() => ({})),
    equalTo: jest.fn(() => ({})),
    get: jest.fn(),
  };
});
jest.mock("firebase/firestore");
jest.mock("./defaultPortfolioData", () => ({
  defaultPortfolioData: { foo: "bar" },
}));

import { renderHook, waitFor } from "@testing-library/react";
import * as firestore from "firebase/firestore";
import { deepMerge, pruneExtraKeys, handleFieldChange, handleNestedFieldChange, handleArrayFieldChange } from "./HandlePortfolioData";

const { get } = require("firebase/database");
const { checkUsernameAvailable } = require("./HandlePortfolioData");

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

describe("checkUsernameAvailable", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return true if username is available (no snapshot exists)", async () => {
    get.mockResolvedValue({ exists: () => false });
    const result = await checkUsernameAvailable("testuser", {});
    expect(result).toBe(true);
    expect(get).toHaveBeenCalled();
  });

  it("should return false if username is taken (snapshot exists)", async () => {
    get.mockResolvedValue({ exists: () => true });
    const result = await checkUsernameAvailable("testuser", {});
    expect(result).toBe(false);
    expect(get).toHaveBeenCalled();
  });
});

describe("GetPortfolioData", () => {
  const defaultPortfolioData = { foo: "bar" };
  const username = "testuser";
  let getFirestoreSpy, docSpy, getDocSpy;

  beforeEach(() => {
    getFirestoreSpy = jest.spyOn(firestore, "getFirestore").mockReturnValue({});
    docSpy = jest.spyOn(firestore, "doc").mockReturnValue({});
    getDocSpy = jest.spyOn(firestore, "getDoc");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should set merged data if portfolio exists", async () => {
    const fakeData = { hello: "world" };
    getDocSpy.mockResolvedValue({
      exists: () => true,
      data: () => fakeData,
    });
    const { result } = renderHook(() => require("./HandlePortfolioData").GetPortfolioData(username));
    await waitFor(() => expect(result.current[0]).toEqual({ ...defaultPortfolioData, ...fakeData }));
  });

  it("should return default data if portfolio does not exist", async () => {
    getDocSpy.mockResolvedValue({ exists: () => false });
    const { result } = renderHook(() => require("./HandlePortfolioData").GetPortfolioData(username));
    await waitFor(() => expect(result.current[0]).toEqual(defaultPortfolioData));
  });
});

describe("handleFieldChange", () => {
  it("should update the specified field in the data object", () => {
    const setData = jest.fn();
    const data = { name: "Alice", age: 25 };
    const event = { target: { value: "Bob" } };
    handleFieldChange(setData, data, "name")(event);
    expect(setData).toHaveBeenCalledWith({ name: "Bob", age: 25 });
  });

  it("should update a numeric field as a string (HTML input behavior)", () => {
    const setData = jest.fn();
    const data = { count: 1 };
    const event = { target: { value: "2" } };
    handleFieldChange(setData, data, "count")(event);
    expect(setData).toHaveBeenCalledWith({ count: "2" });
  });
});

describe("handleNestedFieldChange", () => {
  it("should update the specified nested field in the data object", () => {
    const setData = jest.fn();
    const data = { user: { name: "Alice", age: 25 }, other: 1 };
    handleNestedFieldChange(setData, data, "user", "name")("Bob");
    expect(setData).toHaveBeenCalledWith({ user: { name: "Bob", age: 25 }, other: 1 });
  });

  it("should add the nested field if it does not exist", () => {
    const setData = jest.fn();
    const data = { user: { age: 25 } };
    handleNestedFieldChange(setData, data, "user", "name")("Bob");
    expect(setData).toHaveBeenCalledWith({ user: { age: 25, name: "Bob" } });
  });
});

describe("handleArrayFieldChange", () => {
  it("should update the specified field in the correct array item", () => {
    const setData = jest.fn();
    const data = { items: [ { value: 1 }, { value: 2 } ] };
    handleArrayFieldChange(setData, data, "items", 1, "value")(42);
    expect(setData).toHaveBeenCalledWith({ items: [ { value: 1 }, { value: 42 } ] });
  });

  it("should not mutate other items in the array", () => {
    const setData = jest.fn();
    const data = { items: [ { value: 1, label: "a" }, { value: 2, label: "b" } ] };
    handleArrayFieldChange(setData, data, "items", 0, "label")("z");
    expect(setData).toHaveBeenCalledWith({ items: [ { value: 1, label: "z" }, { value: 2, label: "b" } ] });
  });

  it("should add the field if it does not exist in the array item", () => {
    const setData = jest.fn();
    const data = { items: [ { value: 1 }, { value: 2 } ] };
    handleArrayFieldChange(setData, data, "items", 0, "label")("x");
    expect(setData).toHaveBeenCalledWith({ items: [ { value: 1, label: "x" }, { value: 2 } ] });
  });
});

beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});
afterAll(() => {
  console.warn.mockRestore();
});
