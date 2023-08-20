import { html, css, unsafeCSS, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { createIfNotDefined, QuoteMiniData } from "@finance-widgets/core";
import { SingleProviderConsumer, baseStyle } from "./base";

import quoteminiStyle from "./quote-mini.css";

export class QuoteMini extends SingleProviderConsumer(LitElement) {
  static styles = [baseStyle, css!`${unsafeCSS(quoteminiStyle)}`];

  @property({ type: Object })
  data: QuoteMiniData = null;

  @state()
  protected _price: number = null;

  @state()
  protected _change: number = null;

  @property({ type: String })
  color_positive = "var(--sl-color-success-500)";

  @property({ type: String })
  color_negative = "var(--sl-color-danger-500)";

  @property({ type: String })
  color_neutral = "var(--sl-color-neutral-500)";

  protected _updateData() {
    this.data = {
      ticker: this.ticker,
      price: this._price,
      change: this._change,
    };
    this.requestUpdate();
  }

  updateData(newPrice: number, newChange: number) {
    this._price = newPrice;
    this._change = newChange;
    this._updateData();
  }

  render() {
    let data = this.data;

    // get ticker from provider if provided
    this.ticker = this.getTicker();

    // get data from provider if provided
    if (this.provider.value) {
      this.provider.value.registerQuoteMini(this.ticker, this);
      data = this.provider.value.getQuoteMini(this.ticker);
    }

    // format result
    const { price, change } = data;
    this._price = price;
    this._change = change;

    const contents = html!`
      <div class="row">
        <span class="ticker bold">${this.ticker}</span>
        <span class="price">${this._price.toFixed(2)}</span>
        <span class="icon row ${
          this._change === 0 ? "trending-flat" : this._change > 0 ? "trending-up" : "trending-down"
        } ${this._change === 0 ? "indicator-neutral" : this._change > 0 ? "indicator-positive" : "indicator-negative"}
        "></span>
        <span class="change">${Math.abs(this._change).toFixed(2)}</span>
      </div>`;
    return html`
      <style>
        .indicator-positive {
          color: ${this.color_positive};
        }

        .indicator-negative {
          color: ${this.color_negative};
          color: var(--sl-color-red-600);
        }

        .indicator-neutral {
          color: var(--indicator-neutral);
        }
      </style>
      <div>${contents}</div>
    `;
  }
}

createIfNotDefined("fw-quote-mini", QuoteMini);
