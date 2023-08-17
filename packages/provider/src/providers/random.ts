import { html, LitElement } from "lit";
import { ContextProvider } from "@lit-labs/context";
import {
  QuoteMiniData,
  BaseProvider,
  createIfNotDefined,
  providerContext,
} from "@finance-widgets/core";
import { WidgetBase, baseStyle } from "@finance-widgets/core-ui";

import { TickerTape } from "@finance-widgets/core-ui";
import { fakerEN_US } from "@faker-js/faker";

function choose(choices) {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

type ExchangeData = {
  code: string;
};

export class RandomProvider implements BaseProvider {
  protected _tickertapes: Array<TickerTape>;
  protected _exchanges: Map<string, ExchangeData>;
  protected _stocks: Map<string, QuoteMiniData>;

  constructor() {
    this._tickertapes = new Array<TickerTape>();

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
    this._stocks = new Map<string, QuoteMiniData>();

    [...Array(25)].map(() => {
      const name = `${fakerEN_US.string.alpha({
        length: { min: 2, max: 4 },
        casing: "upper",
      })}.${choose([...this._exchanges.keys()])}`;
      this._stocks.set(name, {
        ticker: name,
        price: fakerEN_US.number.float({ min: 1, max: 90, precision: 0.01 }),
        change: 0.0,
      });
    });

    this.registerTickerTape.bind(this);
    this.getTickerTape.bind(this);
    this._gendata.bind(this);
    this.refresh.bind(this);

    setInterval(() => this.refresh(), 1000);
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

  provider = new ContextProvider(this, {
    context: providerContext,
    initialValue: new RandomProvider(),
  });

  render() {
    return html`<slot></slot>`;
  }
}

createIfNotDefined("fw-random-provider-context", RandomProviderContext);
