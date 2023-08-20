import { html, css, unsafeCSS, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { until } from "lit-html/directives/until.js";
import { createIfNotDefined, formatNumber, QuoteData } from "@finance-widgets/core";
import { SingleProviderConsumer, baseStyle } from "./base";

import quoteStyle from "./quote.css";

export class Quote extends SingleProviderConsumer(LitElement) {
  static styles = [baseStyle, css!`${unsafeCSS(quoteStyle)}`];

  @property({ type: Object })
  data: QuoteData = null;

  @state()
  protected _name: string = "--";

  @state()
  protected _market: string = "";

  @state()
  protected _price: number = 0.0;

  @state()
  protected _change: number = 0.0;

  @property({ type: String })
  orient: "horizontal" | "vertical" = "horizontal";

  @property({ type: String })
  color_positive = "var(--sl-color-success-500)";

  @property({ type: String })
  color_negative = "var(--sl-color-danger-500)";

  @property({ type: String })
  color_neutral = "var(--sl-color-neutral-500)";

  protected _updateData() {
    this.data = {
      ticker: this.ticker || "-",
      name: this._name || "--",
      market: this._market,
      price: this._price || 0.0,
      change: this._change || 0.0,
    };
    this.requestUpdate();
  }

  updateData(data: QuoteData) {
    const { price, change } = data;
    this._price = price;
    this._change = change;
    this._updateData();
  }

  async registerAndRender() {
    await this.provider.value.registerQuote(this.ticker, this);
    this.data = await this.provider.value.getQuote(this.ticker);
    return this.format();
  }

  format() {
    const { ticker, name, market, price, change } = this.data;
    if (ticker && !this.ticker) {
      this.ticker = ticker;
    }
    this._name = name || "--";
    this._market = market;
    this._price = price || 0.0;
    this._change = change || 0.0;
    const _changePercent = change / (price - change);

    const changeHtml = html!`
    <div class="row ${this._change === 0 ? "flat" : this._change > 0 ? "up" : "down"}">
      <span class="change">${formatNumber(this._change)}</span>
      <span class="changePercent">(${formatNumber(_changePercent)}%)</span>
    </div>`;

    const formattedprice = this._price.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 2 });

    let priceRow;
    if (this.orient === "horizontal") {
      priceRow = html!`<div class="row"><span class="price">${formattedprice}</span>${changeHtml}</div>`;
    } else {
      priceRow = html!`<div class="row"><span class="price">${formattedprice}</span></div>`;
    }

    let changeRow;
    if (this.orient === "horizontal") {
      changeRow = html!``;
    } else {
      changeRow = html!`<div class="row">${changeHtml}</div>`;
    }

    const contents = html!`
      <div key=${this.ticker} class="col">
        <div class="row">
          <span class="name mr5">${this._name}</span>
          (<span class="ticker bold">${this.ticker}</span>)
        </div>
        <div class="row">
          <span class="market mr5">${this._market}</span>
        </div>
        ${priceRow}
        ${changeRow}
      </div>`;
    return html`
      <style>
        .up {
          color: ${this.color_positive};
        }

        .down {
          color: ${this.color_negative};
          color: var(--sl-color-red-600);
        }

        .flat {
          color: var(--indicator-neutral);
        }
      </style>
      <div>${contents}</div>
    `;
  }

  render() {
    // get ticker from provider if provided
    this.ticker = this.getTicker();

    // get data from provider if provided
    if (this.provider.value) {
      return html!`${until(this.registerAndRender(), this.loadingBar())}`;
    }
    // format result
    return this.format();
  }
}

createIfNotDefined("fw-quote", Quote);
