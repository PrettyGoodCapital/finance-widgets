import { html, css, unsafeCSS, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { ContextConsumer } from "@lit-labs/context";
import {
  createIfNotDefined,
  QuoteMiniData,
  PortfolioProviderContext,
} from "@finance-widgets/core";

import { QuoteMini } from "./quote-mini";
import { WidgetBase, baseStyle } from "../base";

import tickertapeStyle from "./tickertape.css";

export class TickerTape extends WidgetBase(LitElement) {
  static styles = [baseStyle, css!`${unsafeCSS(tickertapeStyle)}`];

  @property({ type: Array<QuoteMiniData> })
  data = [];

  provider = new ContextConsumer(this, {
    context: PortfolioProviderContext,
    subscribe: true,
  });

  @property({ type: Number })
  delay = 25;

  @property({ type: String })
  color_positive = "var(--sl-color-success-500)";

  @property({ type: String })
  color_negative = "var(--sl-color-danger-500)";

  @property({ type: String })
  color_neutral = "var(--sl-color-neutral-500)";

  updateData(ticker: string, newPrice: number, newChange: number) {
    const elements = this.renderRoot.querySelectorAll(
      `fw-quote-mini[key="${ticker}"]`,
    );
    elements.forEach((elem: QuoteMini) => elem.updateData(newPrice, newChange));
  }

  render() {
    let data;
    if (this.provider.value) {
      // register self with provider
      this.provider.value.registerTickerTape(this);
      data = this.provider.value.getTickerTape();
    } else {
      data = this.data;
    }

    const contents = data.map((datum: QuoteMiniData) => {
      const { ticker } = datum;
      return html!`<fw-quote-mini key=${ticker} data=${JSON.stringify(
        datum,
      )} color_positive="${this.color_positive}" color_neutral="${
        this.color_neutral
      }" color_negative="${this.color_negative}"/></fw-quote-mini>`;
    });
    return html`
      <style>
        fw-quote-mini {
          --ticker-margin: 0 0 0 40px;
        }

        .marquee,
        .marquee2 {
          --time-delay: ${this.delay * data.length}s;
        }
      </style>
      <div key="0" class="marquee">${contents}</div>
      <div key="1" class="marquee2">${contents}</div>
    `;
  }
}

createIfNotDefined("fw-tickertape", TickerTape);
