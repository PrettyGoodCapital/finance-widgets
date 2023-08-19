import { html, css, unsafeCSS, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { createIfNotDefined, ChartMiniData } from "@finance-widgets/core";
import { WidgetBase, baseStyle } from "@finance-widgets/core-ui";
import * as d3 from "d3";
import * as fc from "d3fc";

import sparkStyle from "./spark.css";

export class Spark extends WidgetBase(LitElement) {
  static styles = [baseStyle, css!`${unsafeCSS(sparkStyle)}`];

  @property({ type: Object })
  data: ChartMiniData = null;

  draw() {
    if (!(this.data && this.data.index && this.data.price)) {
      return;
    }

    const extent = fc.extentLinear();
    const xScale = d3.scaleLinear().domain([0, this.data.index.length - 1]);
    const yScale = d3.scaleLinear().domain(extent(this.data.price));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const container: any = this.renderRoot.querySelector("d3fc-canvas");

    // const data = fc.randomGeometricBrownianMotion().steps(100)(1);
    // console.log(JSON.stringify(data));

    const series = fc
      .seriesWebglArea()
      .xScale(xScale)
      .yScale(yScale)
      .crossValue((_, i) => i)
      .mainValue((d) => d)
      .defined(() => true)
      .equals((previousData) => previousData.length > 0);

    let pixels = null;
    let gl = null;

    d3.select(container)
      .on("measure", (event) => {
        const { width, height } = event.detail;
        xScale.range([0, width]);
        yScale.range([height, 0]);
        gl = container.querySelector("canvas").getContext("webgl");
        series.context(gl);
      })
      .on("draw", () => {
        if (pixels === null) {
          pixels = new Uint8Array(
            gl.drawingBufferWidth * gl.drawingBufferHeight * 4,
          );
        }
        series(this.data.price);
      });

    container.requestRedraw();
  }
  render() {
    return html`
      <div class="chart">
        <d3fc-canvas use-device-pixel-ratio set-webgl-viewport></d3fc-canvas>
      </div>
    `;
  }

  updated() {
    this.draw();
  }
}

createIfNotDefined("fw-spark", Spark);
