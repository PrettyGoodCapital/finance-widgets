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
  registerQuote: (ticker: string, quoteElement: HTMLElement) => void;
  getQuote: (ticker: string) => QuoteData | undefined;
  registerQuoteMini: (ticker: string, quoteMiniElement: HTMLElement) => void;
  getQuoteMini: (ticker: string) => QuoteMiniData | undefined;

  /* charts */
  registerSpark: (ticker: string, sparkElement: HTMLElement) => void;
  getSpark: (ticker: string) => ChartMiniData | undefined;
}

export interface SingleTargetProvider extends BaseProvider {
  providesSingleTarget: () => ProvidesSingleTarget[];
  tickerTarget: () => string;
}
