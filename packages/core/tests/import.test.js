import {
  register_global_styles,
  createIfNotDefined,
  providerContext,
} from "../src";

describe("Core", () => {
  test("Existence - register_global_styles", async () => {
    expect(register_global_styles).toBeDefined();
  });
  test("Existence - createIfNotDefined", async () => {
    expect(createIfNotDefined).toBeDefined();
  });
  test("Existence - providerContext", async () => {
    expect(providerContext).toBeDefined();
  });
});
