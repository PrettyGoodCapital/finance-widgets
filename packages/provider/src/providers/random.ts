import { html, LitElement } from "lit";
import { ContextProvider } from "@lit-labs/context";
import {
  createIfNotDefined,
  ChartMiniData,
  QuoteData,
  QuoteMiniData,
  ExchangeData,
  SingleProvider,
  ProvidesSingle,
  PortfolioProvider,
  ProvidesPortfolio,
} from "@finance-widgets/core";
import { SingleProviderContext, PortfolioProviderContext } from "@finance-widgets/core-ui";
import { WidgetBase, baseStyle, Quote, QuoteMini, TickerTape } from "@finance-widgets/core-ui";
import { Spark, randomSeries } from "@finance-widgets/core-charts";
import { fakerEN_US } from "@faker-js/faker";

function choose(choices) {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

export class RandomProvider implements SingleProvider, PortfolioProvider {
  /* single */
  protected _quotes: Map<string, Quote>;
  protected _quoteminis: Map<string, QuoteMini>;
  protected _sparks: Map<string, Spark>;
  /* portfolio */
  protected _tickertapes: Array<TickerTape>;

  protected _exchanges: Map<string, ExchangeData>;
  protected _stocks: Map<string, QuoteData>;
  protected _ticker: string;

  constructor() {
    // TODO this only lets you track 1 per ticker,
    // modify to be new Map<string, Array<Quote>> etc
    /* single */
    this._quotes = new Map<string, Quote>();
    this._quoteminis = new Map<string, QuoteMini>();
    this._sparks = new Map<string, Spark>();
    /* portfolio */
    this._tickertapes = new Array<TickerTape>();

    /* seed data */
    this.seed().then(() => {
      setInterval(() => this.refresh(), 1000);
    });
  }

  async seed() {
    // seed exchanges
    this._exchanges = new Map<string, ExchangeData>();
    [...Array(3)].map(() => {
      const exchangecode = fakerEN_US.string.alpha({
        length: { min: 1, max: 2 },
        casing: "upper",
      });

      // TODO add more info
      this._exchanges.set(exchangecode, { code: exchangecode });
    });

    // seed stocks
    this._stocks = new Map<string, QuoteData>();

    [...Array(25)].map(() => {
      const name = `${fakerEN_US.string.alpha({
        length: { min: 2, max: 4 },
        casing: "upper",
      })}.${choose([...this._exchanges.keys()])}`;
      this._stocks.set(name, {
        ticker: name,
        name,
        price: fakerEN_US.number.float({ min: 1, max: 90, precision: 0.01 }),
        change: 0.0,
      });
    });

    if (this._ticker === undefined) {
      this._ticker = [...this._stocks.keys()][0];
    }
  }

  _gendata() {
    // take random walks
    for (const data of this._stocks.values()) {
      const walk = fakerEN_US.number.float({
        min: -0.1,
        max: 0.1,
        precision: 0.01,
      });
      data.price += walk;
      data.change += walk;
    }
  }

  refresh() {
    this._gendata();
    this._tickertapes.forEach((tt) => {
      tt.updateData([...this._stocks.values()]);
    });
    this._quotes.forEach((q) => {
      const datum = this._stocks.get(this._ticker);
      if (q.ticker === this._ticker) {
        q.updateData(datum);
      }
    });
    this._quoteminis.forEach((q) => {
      const datum = this._stocks.get(this._ticker);
      if (q.ticker === this._ticker) {
        q.updateData(datum);
      }
    });
    this._sparks.forEach((s) => {
      s.updateData();
    });
  }

  /* Provides */
  providesSingle(): ProvidesSingle[] {
    return [ProvidesSingle.Quote, ProvidesSingle.QuoteMini];
  }

  providesPortfolio(): ProvidesPortfolio[] {
    return [ProvidesPortfolio.TickerTape];
  }

  /* Single */
  ticker(): string {
    return this._ticker;
  }

  async registerQuote(ticker: string, quoteElement: Quote) {
    this._quotes.set(ticker, quoteElement);
  }
  async getQuote(ticker: string): Promise<QuoteData> {
    // return array of 25 elements that tick every 1s
    return this._stocks.get(ticker);
  }
  async registerQuoteMini(ticker: string, quoteMiniElement: QuoteMini) {
    this._quoteminis.set(ticker, quoteMiniElement);
  }
  async getQuoteMini(ticker: string): Promise<QuoteMiniData> {
    // return array of 25 elements that tick every 1s
    return this._stocks.get(ticker);
  }
  async registerSpark(ticker: string, sparkElement: Spark) {
    this._sparks.set(ticker, sparkElement);
  }
  async getSpark(ticker: string): Promise<ChartMiniData> {
    // return some random data
    return { ticker, price: randomSeries(100), index: Array.from(Array(100).keys()) };
  }

  /* Portfolio */
  tickers(): string[] {
    return [...this._stocks.keys()];
  }

  async registerTickerTape(tickers: string[], tickerTapeElement: TickerTape) {
    this._tickertapes.push(tickerTapeElement);
  }

  async getTickerTape(): Promise<Array<QuoteMiniData>> {
    // return array of 25 elements that tick every 1s
    this._gendata();
    return [...this._stocks.values()];
  }
}

export class RandomProviderContext extends WidgetBase(LitElement) {
  static styles = [baseStyle];

  provider = new RandomProvider();

  singleprovider = new ContextProvider(this, {
    context: SingleProviderContext,
    initialValue: this.provider,
  });

  portfolioprovider = new ContextProvider(this, {
    context: PortfolioProviderContext,
    initialValue: this.provider,
  });

  render() {
    return html`<slot></slot>`;
  }
}

createIfNotDefined("fw-random-provider-context", RandomProviderContext);
