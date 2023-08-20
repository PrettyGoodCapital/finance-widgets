import { html, LitElement } from "lit";
import { ContextProvider } from "@lit-labs/context";
import { createIfNotDefined } from "@finance-widgets/core";
import {
  SingleProviderContext,
  SingleTargetProviderContext,
  PortfolioProviderContext,
  PortfolioTargetProviderContext,
} from "../provider";
import { WidgetBase, baseStyle } from "../components";

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
