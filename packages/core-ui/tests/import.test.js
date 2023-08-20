import {
  Layout,
  ProviderContext,
  TickerContext,
  TickerTape,
  Quote,
  QuoteMini,
  WidgetBase,
  SingleProviderConsumer,
  PortfolioProviderConsumer,
  SingleProviderContext,
  SingleTargetProviderContext,
  PortfolioProviderContext,
  PortfolioTargetProviderContext,
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
  test("Existence - SingleProviderConsumer", async () => {
    expect(SingleProviderConsumer).toBeDefined();
  });
  test("Existence - PortfolioProviderConsumer", async () => {
    expect(PortfolioProviderConsumer).toBeDefined();
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
