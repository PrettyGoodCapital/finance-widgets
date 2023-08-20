import { html, css, unsafeCSS, LitElement } from "lit";
import { until } from "lit-html/directives/until.js";
import { property } from "lit/decorators.js";
import { createIfNotDefined, QuoteMiniData } from "@finance-widgets/core";

import { QuoteMini } from "./quote-mini";
import { PortfolioProviderConsumer, baseStyle } from "./base";

import tickertapeStyle from "./tickertape.css";

export class TickerTape extends PortfolioProviderConsumer(LitElement) {
  static styles = [baseStyle, css!`${unsafeCSS(tickertapeStyle)}`];

  @property({ type: Array<QuoteMiniData> })
  data = [];

  @property({ type: Number })
  delay = 25;

  @property({ type: String })
  color_positive = "var(--sl-color-success-500)";

  @property({ type: String })
  color_negative = "var(--sl-color-danger-500)";

  @property({ type: String })
  color_neutral = "var(--sl-color-neutral-500)";

  updateData(data: Array<QuoteMiniData>) {
    data.forEach((datum) => {
      const { ticker } = datum;
      const elements = this.renderRoot.querySelectorAll(`fw-quote-mini[ticker="${ticker}"]`);
      elements.forEach((elem: QuoteMini) => elem.updateData(datum));
    });
  }

  async registerAndRender() {
    await this.provider.value.registerTickerTape(this.tickers, this);
    this.data = await this.provider.value.getTickerTape(this.tickers);
    return this.format();
  }
  format() {
    // format result
    const contents = this.data.map((datum: QuoteMiniData) => {
      const { ticker } = datum;
      return html!`<fw-quote-mini key=${ticker} ticker=${ticker} data=${JSON.stringify(datum)} color_positive="${
        this.color_positive
      }" color_neutral="${this.color_neutral}" color_negative="${this.color_negative}"/></fw-quote-mini>`;
    });
    return html`
      <style>
        fw-quote-mini {
          --ticker-margin: 0 0 0 40px;
        }

        .marquee,
        .marquee2 {
          --time-delay: ${this.delay * this.data.length}s;
        }
      </style>
      <div key="0" class="marquee">${contents}</div>
      <div key="1" class="marquee2">${contents}</div>
    `;
  }

  render() {
    // get ticker from provider if provided
    this.tickers = this.getTickers();

    // get data from provider if provided
    if (this.provider.value) {
      return html!`${until(this.registerAndRender(), this.loadingBar())}`;
    }

    if (!this.data.length) {
      return "";
    }

    // format result
    return this.format();
  }
}

createIfNotDefined("fw-tickertape", TickerTape);
