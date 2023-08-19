import { html, css, unsafeCSS, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { createIfNotDefined } from "@finance-widgets/core";
import { WidgetBase, baseStyle } from "@finance-widgets/core-ui";
import hljs from "highlight.js";

import hljsDefaultCss from "highlight.js/styles/default.css";
import codeusageStyle from "./code-usage.css";

export function highlightCode(code, lang) {
  // https://highlightjs.readthedocs.io/en/latest/api.html#highlightauto-value-languagesubset
  const highlightedCode = hljs.highlightAuto(code, lang ? [lang] : undefined).value;
  return highlightedCode;
}

export function guidGenerator() {
  const S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
}

export class CodeBlock extends LitElement {
  static styles = [baseStyle, css!`${unsafeCSS(hljsDefaultCss)}`, css!`${unsafeCSS(codeusageStyle)}`];

  @property({ type: String })
  language = "html";

  @property({ type: String })
  code = "";

  @property({ type: String })
  id = guidGenerator();

  render() {
    const highlightedCode = highlightCode(this.code, this.language);
    return html`
      <style>
        ${hljsDefaultCss}
      </style>
      <div class="align-center">
        <pre>
        <code id="${this.id}">${unsafeHTML(highlightedCode)}</code>
      </pre>
        <sl-copy-button from="${this.id}"></sl-copy-button>
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

export class CodeUsage extends WidgetBase(LitElement) {
  static styles = [baseStyle, css!`${unsafeCSS(codeusageStyle)}`];

  @property({ type: String })
  language = "html";

  @property({ type: String })
  code = "";

  render() {
    return html` <div class="col pt10">
      <sl-card class="card-basic">
        <div class="header" slot="header">
          <h4 class="mb10">Description</h4>
          <slot name="description"></slot>
        </div>
        <slot name="code-block">
          <h4 class="mb10">Usage</h4>
          <fw-utils-codeblock language="${this.language}" code="${this.code}"></fw-utils-codeblock>
        </slot>
        <div slot="footer">
          <h4 class="mb10">Example</h4>
          <slot name="example"></slot>
        </div>
      </sl-card>
    </div>`;
  }
}

createIfNotDefined("fw-utils-codeblock", CodeBlock);
createIfNotDefined("fw-utils-codeusage", CodeUsage);
