import { CodeBlock, CodeUsage, guidGenerator, highlightCode } from "../src";

describe("Utilities", () => {
  test("Existence - CodeBlock", async () => {
    expect(CodeBlock).toBeDefined();
  });
  test("Existence - CodeUsage", async () => {
    expect(CodeUsage).toBeDefined();
  });
  test("Existence - highlightCode", async () => {
    expect(highlightCode).toBeDefined();
  });
  test("Existence - guidGenerator", async () => {
    expect(guidGenerator).toBeDefined();
  });
});
