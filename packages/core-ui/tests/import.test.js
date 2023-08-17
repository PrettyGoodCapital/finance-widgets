import {
  Layout,
  ProviderContext,
  TickerContext,
  TickerTape,
  Quote,
  QuoteMini,
  WidgetBase,
  baseStyle,
} from "../src";

describe("Core UI", () => {
  test("Existence - Layout", async () => {
    expect(Layout).toBeDefined();
  });
  test("Existence - baseStyle", async () => {
    expect(baseStyle).toBeDefined();
  });
  test("Existence - WidgetBase", async () => {
    expect(WidgetBase).toBeDefined();
  });

  test("Existence - Tickertape", async () => {
    expect(TickerTape).toBeDefined();
  });
  test("Existence - QuoteMini", async () => {
    expect(Quote).toBeDefined();
  });
  test("Existence - QuoteMini", async () => {
    expect(QuoteMini).toBeDefined();
  });

  test("Existence - TickerContext", async () => {
    expect(TickerContext).toBeDefined();
  });
  test("Existence - ProviderContext", async () => {
    expect(ProviderContext).toBeDefined();
  });
});
