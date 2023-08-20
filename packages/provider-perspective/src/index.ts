import {
  QuoteMiniData,
  SingleProvider,
  ProvidesSingle,
  PortfolioProvider,
  ProvidesPortfolio,
} from "@finance-widgets/core";
import { Quote, QuoteMini, TickerTape } from "@finance-widgets/core-ui";
import { Spark } from "@finance-widgets/core-charts";

export class PerspectiveProvider implements SingleProvider, PortfolioProvider {
  /* single */
  protected _quotes: Map<string, Quote>;
  protected _quoteminis: Map<string, QuoteMini>;
  protected _sparks: Map<string, Spark>;
  /* portfolio */
  protected _tickertapes: Array<TickerTape>;

  constructor() {
    /* single */
    this._quotes = new Map<string, Quote>();
    this._quoteminis = new Map<string, QuoteMini>();
    this._sparks = new Map<string, Spark>();
    /* portfolio */
    this._tickertapes = new Array<TickerTape>();
  }

  ticker(): string {
    return "";
  }

  tickers(): string[] {
    return [];
  }

  providesSingle(): ProvidesSingle[] {
    return [];
  }

  providesPortfolio(): ProvidesPortfolio[] {
    return [];
  }

  registerQuote(ticker: string, quoteElement: Quote) {
    this._quotes.set(ticker, quoteElement);
  }

  getQuote(): undefined {}

  registerQuoteMini(ticker: string, quoteMiniElement: QuoteMini) {
    this._quoteminis.set(ticker, quoteMiniElement);
  }

  getQuoteMini(): undefined {}

  registerSpark(ticker: string, sparkElement: Spark) {
    this._sparks.set(ticker, sparkElement);
  }

  getSpark(): undefined {}

  registerTickerTape(tickers: string[], tickerTapeElement: TickerTape) {
    this._tickertapes.push(tickerTapeElement);
  }

  getTickerTape(): Array<QuoteMiniData> {
    return [];
  }
}
