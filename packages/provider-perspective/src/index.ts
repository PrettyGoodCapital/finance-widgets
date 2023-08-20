import {
  QuoteMiniData,
  SingleProvider,
  ProvidesSingle,
  PortfolioProvider,
  ProvidesPortfolio,
  ProvidesSingleTarget,
  ProvidesPortfolioTarget,
} from "@finance-widgets/core";
import { Quote, QuoteMini, TickerTape } from "@finance-widgets/core-ui";
import { Spark } from "@finance-widgets/core-charts";
import { Table, UpdateCallback } from "@finos/perspective";

export type PerspectiveProviders = {
  single: { [key in ProvidesSingle]: Table };
  singleTarget: { [key in ProvidesSingleTarget]: Table };
  portfolio: { [key in ProvidesPortfolio]: Table };
  portfolioTarget: { [key in ProvidesPortfolioTarget]: Table };
};

export type PerspectiveSingleAccessor = (that: PerspectiveProvider, ticker: string) => unknown;
export type PerspectiveSingleTargetAccessor = (that: PerspectiveProvider, ticker: string) => unknown;
export type PerspectivePortfolioAccessor = (that: PerspectiveProvider, tickers: string[]) => unknown;
export type PerspectivePortfolioTargetAccessor = (that: PerspectiveProvider, tickers: string[]) => unknown;

export type KeyType = "single" | "singleTarget" | "portfolio" | "portfolioTarget";

export type PerspectiveProviderAccessors = {
  single: Map<ProvidesSingle, PerspectiveSingleAccessor>;
  singleTarget: Map<ProvidesSingleTarget, PerspectiveSingleTargetAccessor>;
  portfolio: Map<ProvidesPortfolio, PerspectivePortfolioAccessor>;
  portfolioTarget: Map<ProvidesPortfolioTarget, PerspectivePortfolioTargetAccessor>;
};

export type PerspectiveSingleUpdater = (that: PerspectiveProvider, ticker: string) => Updater;
export type PerspectiveSingleTargetUpdater = (that: PerspectiveProvider, ticker: string) => Updater;
export type PerspectivePortfolioUpdater = (that: PerspectiveProvider, tickers: string[]) => Updater;
export type PerspectivePortfolioTargetUpdater = (that: PerspectiveProvider, tickers: string[]) => Updater;

export type PerspectiveProviderUpdaters = {
  single: Map<ProvidesSingle, PerspectiveSingleUpdater>;
  singleTarget: Map<ProvidesSingleTarget, PerspectiveSingleTargetUpdater>;
  portfolio: Map<ProvidesPortfolio, PerspectivePortfolioUpdater>;
  portfolioTarget: Map<ProvidesPortfolioTarget, PerspectivePortfolioTargetUpdater>;
};

type Updater = (callback: UpdateCallback, options?: { mode?: string }) => void;

export class PerspectiveProvider implements SingleProvider, PortfolioProvider {
  /* single */
  protected _quotes: Map<string, Quote>;
  protected _quoteminis: Map<string, QuoteMini>;
  protected _sparks: Map<string, Spark>;

  /* portfolio */
  protected _tickertapes: Array<TickerTape>;

  /* internal */
  protected _data: PerspectiveProviders;
  protected _accessors: PerspectiveProviderAccessors;
  protected _updaters: PerspectiveProviderUpdaters;

  constructor(
    data: PerspectiveProviders,
    accessors: PerspectiveProviderAccessors,
    updaters: PerspectiveProviderUpdaters,
  ) {
    /* single */
    this._quotes = new Map<string, Quote>();
    this._quoteminis = new Map<string, QuoteMini>();
    this._sparks = new Map<string, Spark>();

    /* portfolio */
    this._tickertapes = new Array<TickerTape>();

    /* internal */
    this._data = data;
    this._accessors = accessors;
    this._updaters = updaters;
  }

  // TODO fix any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected async getAccessor(kind: KeyType, provides: any, ticker: string) {
    const stuff = this._accessors[kind];
    if (stuff) {
      const accessor = stuff[provides];
      if (accessor) {
        return await accessor(this, ticker);
      }
    }
  }

  // TODO fix any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected setUpdaters(kind: KeyType, provides: any, ticker: string, element: any) {
    const stuff = this._updaters[kind];
    if (stuff) {
      Object.keys(stuff).forEach(async (value) => {
        const on_update = stuff[value];
        if (on_update) {
          const updater: Updater = await on_update(this, ticker);
          updater(async () => {
            // TODO
            const data = await this.getAccessor(kind, provides, ticker);
            element.updateData(data);
          });
        }
      });
    }
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

  async registerQuote(ticker: string, quoteElement: Quote) {
    this._quotes.set(ticker, quoteElement);
  }

  getQuote(): undefined {}

  async registerQuoteMini(ticker: string, quoteMiniElement: QuoteMini) {
    // avoid duplicates
    if (this._quoteminis.get(ticker)) {
      return;
    }

    this._quoteminis.set(ticker, quoteMiniElement);
    this.setUpdaters("single", ProvidesSingle.QuoteMini, ticker, quoteMiniElement);
  }

  async getQuoteMini(ticker: string): Promise<QuoteMiniData> {
    return (await this.getAccessor("single", ProvidesSingle.QuoteMini, ticker)) as QuoteMiniData;
  }

  async registerSpark(ticker: string, sparkElement: Spark) {
    this._sparks.set(ticker, sparkElement);
  }

  getSpark(): undefined {}

  async registerTickerTape(tickers: string[], tickerTapeElement: TickerTape) {
    this._tickertapes.push(tickerTapeElement);
  }

  getTickerTape(): undefined {}
}
