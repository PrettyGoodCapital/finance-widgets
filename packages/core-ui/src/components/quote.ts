import { html, css, unsafeCSS, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { createIfNotDefined, QuoteData } from "@finance-widgets/core";
import { WidgetBase, baseStyle } from "../base";

import quoteStyle from "./quote.css";

export class Quote extends WidgetBase(LitElement) {
  static styles = [baseStyle, css!`${unsafeCSS(quoteStyle)}`];

  @property({ type: Object })
  data: QuoteData = null;

  @state()
  protected _ticker: string = "";

  @state()
  protected _name: string = "";

  @state()
  protected _market: string = "";

  @state()
  protected _price: number = null;

  @state()
  protected _change: number = null;

  @state()
  protected _changePercent: number = null;

  @property({ type: String })
  color_positive = "var(--sl-color-success-500)";

  @property({ type: String })
  color_negative = "var(--sl-color-danger-500)";

  @property({ type: String })
  color_neutral = "var(--sl-color-neutral-500)";

  protected _updateData() {
    this.data = {
      ticker: this._ticker,
      name: this._name,
      market: this._market,
      price: this._price,
      change: this._change,
      changePercent: this._changePercent,
    };
    this.requestUpdate();
  }

  updateData(newPrice: number, newChange: number, newChangePercent?: number) {
    this._price = newPrice;
    this._change = newChange;
    this._changePercent = newChangePercent;
    this._updateData();
  }

  render() {
    if (this.data) {
      const { ticker, name, market, price, change, changePercent } = this.data;
      this._ticker = ticker;
      this._name = name;
      this._market = market;
      this._price = price;
      this._change = change;
      this._changePercent = changePercent;
    }

    const contents = html!`
      <div key=${this._ticker} class="col">
        <div class="row">
          <span class="name mr5">${this._name}</span>
          (<span class="ticker bold">${this._ticker}</span>)
        </div>
        <div class="row">
          <span class="market mr5">${this._market}</span>
        </div>
        <div class="row">
          <span class="price">${this._price.toFixed(2)}</span>
          <div class="row ${
            this._change === 0 ? "flat" : this._change > 0 ? "up" : "down"
          }">
            <span class="change">${this._change.toFixed(2)}</span>
            <span class="changePercent">(${this._changePercent.toFixed(
              2,
            )}%)</span>
          </div>
        </div>
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
}

createIfNotDefined("fw-quote", Quote);
