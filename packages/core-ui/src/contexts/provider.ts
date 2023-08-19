import { html, LitElement } from "lit";
import { ContextProvider } from "@lit-labs/context";
import {
  createIfNotDefined,
  SingleProviderContext,
  SingleTargetProviderContext,
  PortfolioProviderContext,
  PortfolioTargetProviderContext,
} from "@finance-widgets/core";
import { WidgetBase, baseStyle } from "../base";

export class ProviderContext extends WidgetBase(LitElement) {
  static styles = [baseStyle];

  singleprovider = new ContextProvider(this, {
    context: SingleProviderContext,
  });
  singletargetprovider = new ContextProvider(this, {
    context: SingleTargetProviderContext,
  });
  portfolioprovider = new ContextProvider(this, {
    context: PortfolioProviderContext,
  });
  portfoliotargetprovider = new ContextProvider(this, {
    context: PortfolioTargetProviderContext,
  });

  render() {
    return html`<slot></slot>`;
  }
}

createIfNotDefined("fw-provider-context", ProviderContext);
