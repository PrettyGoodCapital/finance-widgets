import {
  register_global_styles,
  createIfNotDefined,
  SingleProviderContext,
  SingleTargetProviderContext,
  PortfolioProviderContext,
  PortfolioTargetProviderContext,
} from "../src";

describe("Core", () => {
  test("Existence - register_global_styles", async () => {
    expect(register_global_styles).toBeDefined();
  });
  test("Existence - createIfNotDefined", async () => {
    expect(createIfNotDefined).toBeDefined();
  });
  test("Existence - SingleProviderContext", async () => {
    expect(SingleProviderContext).toBeDefined();
  });
  test("Existence - SingleTargetProviderContext", async () => {
    expect(SingleTargetProviderContext).toBeDefined();
  });
  test("Existence - PortfolioProviderContext", async () => {
    expect(PortfolioProviderContext).toBeDefined();
  });
  test("Existence - PortfolioTargetProviderContext", async () => {
    expect(PortfolioTargetProviderContext).toBeDefined();
  });
});
