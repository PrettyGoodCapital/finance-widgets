import { css, unsafeCSS, LitElement, CSSResult } from "lit";

import baseStyleRaw from "./base.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T> = new (...args: any[]) => T;

export declare class WidgetBaseInterface {
  static baseStyle: CSSResult;
}

export const baseStyle = css`
  ${unsafeCSS(baseStyleRaw)}
`;

export const WidgetBase = <T extends Constructor<LitElement>>(superClass: T) => {
  class WidgetBaseClass extends superClass {
    // static styles = [baseStyle];
  }
  // Cast return type to your mixin's interface intersected with the superClass type
  return WidgetBaseClass as Constructor<WidgetBaseInterface> & T;
};
