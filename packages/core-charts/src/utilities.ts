import * as fc from "d3fc";

export function randomSeries(len: number = 100) {
  return fc.randomGeometricBrownianMotion().steps(len)(1);
}
