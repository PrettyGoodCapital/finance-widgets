import { html, css, unsafeCSS, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { ContextConsumer } from "@lit-labs/context";
import { createIfNotDefined, ChartMiniData, SingleProviderContext } from "@finance-widgets/core";

import { WidgetBase, baseStyle } from "@finance-widgets/core-ui";
import * as d3 from "d3";
import * as fc from "d3fc";

import sparkStyle from "./spark.css";

export class Spark extends WidgetBase(LitElement) {
  static styles = [baseStyle, css!`${unsafeCSS(sparkStyle)}`];

  @property({ type: Object })
  data: ChartMiniData = null;

  provider = new ContextConsumer(this, {
    context: SingleProviderContext,
    subscribe: true,
  });

  @property({ type: String })
  color: string = "--sl-color-primary-500";

  @property({ type: String })
  colorShadow: string = "--sl-color-primary-200";

  // TODO implement with actual data
  updateData() {
    this.redraw();
  }

  redraw() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const container: any = this.renderRoot.querySelector("d3fc-canvas");
    container.requestRedraw();
  }

  draw() {
    let data = this.data;

    if (this.provider.value) {
      this.provider.value.registerSpark(this);
      data = this.provider.value.getSpark();
    }

    if (!(data && data.index && data.price)) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const container: any = this.renderRoot.querySelector("d3fc-canvas");

    const observer = new MutationObserver(() => this.redraw());
    observer.observe(document.documentElement, { attributeFilter: ["class"] });

    const extent = fc.extentLinear();
    const xScale = d3.scaleLinear().domain([0, data.index.length - 1]);
    const yScale = d3.scaleLinear().domain(extent(data.price));

    // const gridlines = fc.annotationCanvasGridline();
    // const crosshairs = fc.annotationCanvasCrosshair();
    const area = fc
      .seriesCanvasArea()
      .crossValue((_, i) => i)
      .mainValue((d) => d);

    // const series = fc.seriesCanvasMulti().xScale(xScale).yScale(yScale).series([gridlines, area]);
    const series = fc
      .seriesCanvasMulti()
      .xScale(xScale)
      .yScale(yScale)
      .series([area])
      .decorate((context) => {
        // context.shadowColor = "rgba(255, 0, 0, 1)";
        let color, colorShadow;
        if (this.color.startsWith("--")) {
          color = getComputedStyle(document.body).getPropertyValue(this.color);
        } else {
          color = this.color;
        }
        if (this.colorShadow.startsWith("--")) {
          colorShadow = getComputedStyle(document.body).getPropertyValue(this.colorShadow);
        } else {
          colorShadow = this.colorShadow;
        }
        context.fillStyle = colorShadow;
        context.strokeStyle = color;
      });

    d3.select(container)
      .on("draw", () => {
        series(data.price);
      })
      .on("measure", (event) => {
        const { width, height } = event.detail;
        xScale.range([0, width]);
        yScale.range([height, 0]);
        const ctx = container.querySelector("canvas").getContext("2d");
        series.context(ctx);
      });
    this.redraw();
  }
  render() {
    return html`
      <div class="chart">
        <d3fc-canvas></d3fc-canvas>
      </div>
    `;
  }

  updated() {
    this.draw();
  }
}

createIfNotDefined("fw-spark", Spark);
