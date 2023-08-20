import { BaseProvider } from "./base";
import { QuoteData, QuoteMiniData, ChartMiniData } from "../types";

export enum ProvidesSingle {
  QuoteMini,
  Quote,
}

export enum ProvidesSingleTarget {}

export interface SingleProvider extends BaseProvider {
  /* core */
  providesSingle: () => ProvidesSingle[] | undefined;
  ticker: () => string;

  /* core */
  registerQuote: (ticker: string, quoteElement: HTMLElement) => Promise<void>;
  getQuote: (ticker: string) => Promise<QuoteData> | undefined;
  registerQuoteMini: (ticker: string, quoteMiniElement: HTMLElement) => Promise<void>;
  getQuoteMini: (ticker: string) => Promise<QuoteMiniData> | undefined;

  /* charts */
  registerSpark: (ticker: string, sparkElement: HTMLElement) => Promise<void>;
  getSpark: (ticker: string) => Promise<ChartMiniData> | undefined;
}

export interface SingleTargetProvider extends BaseProvider {
  providesSingleTarget: () => ProvidesSingleTarget[] | undefined;
  tickerTarget: () => string;
}
