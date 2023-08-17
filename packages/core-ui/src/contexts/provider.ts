import { html, LitElement } from "lit";
import { ContextProvider } from "@lit-labs/context";
import { createIfNotDefined, providerContext } from "@finance-widgets/core";
import { WidgetBase, baseStyle } from "../base";

export class ProviderContext extends WidgetBase(LitElement) {
  static styles = [baseStyle];

  provider = new ContextProvider(this, { context: providerContext });

  render() {
    return html`<slot></slot>`;
  }
}

createIfNotDefined("fw-provider-context", ProviderContext);
