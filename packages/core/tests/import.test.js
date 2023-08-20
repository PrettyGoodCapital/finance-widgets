import { register_global_styles, createIfNotDefined } from "../src";

describe("Core", () => {
  test("Existence - register_global_styles", async () => {
    expect(register_global_styles).toBeDefined();
  });
  test("Existence - createIfNotDefined", async () => {
    expect(createIfNotDefined).toBeDefined();
  });
});
