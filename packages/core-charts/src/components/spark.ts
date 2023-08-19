import { html, css, unsafeCSS, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { createIfNotDefined, ChartData } from "@finance-widgets/core";
import { WidgetBase, baseStyle } from "@finance-widgets/core-ui";

import sparkStyle from "./spark.css";

export class Spark extends WidgetBase(LitElement) {
  static styles = [baseStyle, css!`${unsafeCSS(sparkStyle)}`];

  @property({ type: Object })
  data: ChartData = null;

  render() {
    const contents = "";
    return html`
      <style>
      <div>${contents}</div>
    `;
  }
}

createIfNotDefined("fw-spark", Spark);
