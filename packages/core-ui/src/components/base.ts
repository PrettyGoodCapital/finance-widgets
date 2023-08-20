import { css, unsafeCSS, LitElement, CSSResult } from "lit";
import { property } from "lit/decorators.js";
import { ContextConsumer } from "@lit-labs/context";
import { SingleProvider, PortfolioProvider } from "@finance-widgets/core";
import baseStyleRaw from "./base.css";
import { SingleProviderContext, PortfolioProviderContext } from "../provider";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T> = new (...args: any[]) => T;

export declare class WidgetBaseInterface {
  static baseStyle: CSSResult;
}

export const baseStyle = css`
  ${unsafeCSS(baseStyleRaw)}
`;

export const WidgetBase = <T extends Constructor<LitElement>>(superClass: T) => {
  class WidgetBaseClass extends superClass {
    // static styles = [baseStyle];
  }
  // Cast return type to your mixin's interface intersected with the superClass type
  return WidgetBaseClass as Constructor<WidgetBaseInterface> & T;
};

export declare class SingleProviderConsumerInterface {
  ticker: string;
  provider: ContextConsumer<{ __context__: SingleProvider }, LitElement>;
  getTicker: () => string;
}

export const SingleProviderConsumer = <T extends Constructor<LitElement>>(superClass: T) => {
  class SingleProviderConsumerClass extends superClass {
    provider = new ContextConsumer(this, {
      context: SingleProviderContext,
      subscribe: true,
    });

    @property({ type: String })
    ticker: string;

    getTicker(): string {
      if (this.provider.value && !this.ticker) {
        // Set ticker to provider's value
        this.ticker = this.provider.value.ticker();
      }
      return this.ticker;
    }
  }
  // Cast return type to your mixin's interface intersected with the superClass type
  return SingleProviderConsumerClass as Constructor<SingleProviderConsumerInterface> & T;
};

export declare class PortfolioProviderConsumerInterface {
  tickers: string[];
  provider: ContextConsumer<{ __context__: PortfolioProvider }, LitElement>;
  getTickers: () => string[];
}

export const PortfolioProviderConsumer = <T extends Constructor<LitElement>>(superClass: T) => {
  class PortfolioProviderConsumerClass extends superClass {
    provider = new ContextConsumer(this, {
      context: PortfolioProviderContext,
      subscribe: true,
    });

    @property({ type: Array<string> })
    tickers: string[] = [];

    getTickers(): string[] {
      if (this.provider.value && !this.tickers.length) {
        // Set ticker to provider's value
        this.tickers = this.provider.value.tickers();
      }
      return this.tickers;
    }
  }
  // Cast return type to your mixin's interface intersected with the superClass type
  return PortfolioProviderConsumerClass as Constructor<PortfolioProviderConsumerInterface> & T;
};
