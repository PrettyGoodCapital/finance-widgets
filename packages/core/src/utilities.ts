import { ContextRoot } from "@lit-labs/context";
import globalStyle from "./index.css";

export const register_global_styles = () => {
  const style = document.createElement("style");
  style.textContent = globalStyle;
  document.head.insertBefore(style, document.head.firstChild);
};

document.addEventListener("DOMContentLoaded", () => {
  register_global_styles();
  const root = new ContextRoot();
  root.attach(document.body);
});

export const createIfNotDefined = (name, element) => {
  if (document.createElement(name).constructor === HTMLElement) {
    window.customElements.define(name, element);
    console.log(`Registering custom element ${name}`);
  }
};
