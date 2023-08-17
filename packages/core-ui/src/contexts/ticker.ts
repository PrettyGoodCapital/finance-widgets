import { html, LitElement } from "lit";
import { provide, createContext } from "@lit-labs/context";
import { createIfNotDefined } from "@finance-widgets/core";
import { WidgetBase, baseStyle } from "../base";

/* https://lit.dev/docs/data/context/ */
export const tickerContext = createContext<string>("ticker");

export class TickerContext extends WidgetBase(LitElement) {
  static styles = [baseStyle];

  @provide({ context: tickerContext })
  ticker = "";

  render() {
    return html`<slot></slot>`;
  }
}

createIfNotDefined("fw-ticker-context", TickerContext);
