import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { createIfNotDefined } from "@finance-widgets/core";
import { WidgetBase, baseStyle } from "./base";

export class Layout extends WidgetBase(LitElement) {
  static styles = [baseStyle];

  @property({ type: String })
  name = "Test";

  render() {
    return html`
      <sl-tab-group>
        <slot slot="nav"></slot>
        <slot></slot>
      </sl-tab-group>
    `;
  }
}

createIfNotDefined("fw-layout", Layout);
