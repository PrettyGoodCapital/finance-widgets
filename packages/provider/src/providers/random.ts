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
  SingleProviderContext,
  PortfolioProviderContext,
} from "@finance-widgets/core";
import { WidgetBase, baseStyle, Quote, QuoteMini, TickerTape } from "@finance-widgets/core-ui";
import { Spark, randomSeries } from "@finance-widgets/core-charts";
import { fakerEN_US } from "@faker-js/faker";

function choose(choices) {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

export class RandomProvider implements SingleProvider, PortfolioProvider {
  protected _quotes: Array<Quote>;
  protected _quoteminis: Array<QuoteMini>;
  protected _tickertapes: Array<TickerTape>;
  protected _sparks: Array<Spark>;

  protected _exchanges: Map<string, ExchangeData>;
  protected _stocks: Map<string, QuoteData>;
  protected _ticker: string;

  constructor() {
    this._quotes = new Array<Quote>();
    this._quoteminis = new Array<QuoteMini>();
    this._tickertapes = new Array<TickerTape>();
    this._sparks = new Array<Spark>();

    this.seed.bind(this);
    this.registerTickerTape.bind(this);
    this.getTickerTape.bind(this);
    this._gendata.bind(this);
    this.refresh.bind(this);

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

    this._ticker = [...this._stocks.keys()][0];
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
      for (const datum of this._stocks.values()) {
        const { ticker, price, change } = datum;
        tt.updateData(ticker, price, change);
      }
    });
    this._quotes.forEach((q) => {
      const { price, change } = this._stocks.get(this._ticker);
      q.updateData(price, change);
    });
    this._quoteminis.forEach((q) => {
      const { price, change } = this._stocks.get(this._ticker);
      q.updateData(price, change);
    });
    this._sparks.forEach((s) => {
      s.updateData();
    });
  }

  providesSingle(): ProvidesSingle[] {
    return [ProvidesSingle.Quote, ProvidesSingle.QuoteMini];
  }

  providesPortfolio(): ProvidesPortfolio[] {
    return [ProvidesPortfolio.TickerTape];
  }

  registerQuote(quoteElement: Quote) {
    this._quotes.push(quoteElement);
  }

  getQuote(): QuoteData {
    // return array of 25 elements that tick every 1s
    return this._stocks.get(this._ticker);
  }

  registerQuoteMini(quoteMiniElement: QuoteMini) {
    this._quoteminis.push(quoteMiniElement);
  }

  getQuoteMini(): QuoteMiniData {
    // return array of 25 elements that tick every 1s
    return this._stocks.get(this._ticker);
  }

  registerSpark(sparkElement: Spark) {
    this._sparks.push(sparkElement);
  }

  getSpark(): ChartMiniData {
    // return some random data
    return { ticker: this._ticker, price: randomSeries(100), index: Array.from(Array(100).keys()) };
  }

  registerTickerTape(tickerTapeElement: TickerTape) {
    this._tickertapes.push(tickerTapeElement);
  }

  getTickerTape(): Array<QuoteMiniData> {
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
