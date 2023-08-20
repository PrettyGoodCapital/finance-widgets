import globalStyle from "./index.css";

export const register_global_styles = () => {
  const style = document.createElement("style");
  style.textContent = globalStyle;
  document.head.insertBefore(style, document.head.firstChild);
};

document.addEventListener("DOMContentLoaded", () => {
  register_global_styles();
});

export const createIfNotDefined = (name, element) => {
  if (document.createElement(name).constructor === HTMLElement) {
    window.customElements.define(name, element);
    console.log(`Registering custom element ${name}`);
  }
};

export function formatNumber(num: number, decimals: number = 2): string {
  return `${num >= 0 ? "+" : ""}${num.toLocaleString("en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: decimals,
  })}`;
}
