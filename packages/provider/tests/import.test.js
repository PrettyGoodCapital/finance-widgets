import { RandomProvider } from "../src";

describe("Core Providers", () => {
  test("Existence - BaseProvider", async () => {
    expect(RandomProvider).toBeDefined();
  });
});
