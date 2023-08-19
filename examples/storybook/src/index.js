import "@finance-widgets/core";
import "@finance-widgets/core-ui";
import "@finance-widgets/core-charts";
import "@finance-widgets/provider";
import "@finance-widgets/utilities";
import "./index.css";

import { version } from "../package.json";

window.switchTheme = () => {
  if (document.documentElement.classList.contains("sl-theme-light")) {
    document.getElementById("themeswitch").setAttribute("name", "moon");
    document.documentElement.classList.remove("sl-theme-light");
    document.documentElement.classList.add("sl-theme-dark");
  } else {
    document.getElementById("themeswitch").setAttribute("name", "sun");
    document.documentElement.classList.remove("sl-theme-dark");
    document.documentElement.classList.add("sl-theme-light");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  /* Set version string */
  document.getElementById("version").textContent = version;

  /* Theming */
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    // default is light, switch to dark first time
    window.switchTheme();
  }

  /* Navigation */
  window.onhashchange = () => {
    // highlight the link
    document.querySelectorAll("a").forEach((a) => {
      if (a.getAttribute("href") === window.location.hash) {
        a.classList.add("active-link");
      } else {
        a.classList.remove("active-link");
      }
    });
    // Update the page
    document.querySelectorAll(".page").forEach((p) => p.classList.add("page-hidden"));
    document.querySelector(window.location.hash).classList.remove("page-hidden");
  };

  document.querySelectorAll(".page").forEach((p) => p.classList.add("page-hidden"));

  if (window.location.hash) {
    document.querySelector(window.location.hash).classList.remove("page-hidden");
    document.querySelectorAll("a").forEach((a) => {
      if (a.getAttribute("href") === window.location.hash) {
        a.classList.add("active-link");
      } else {
        a.classList.remove("active-link");
      }
    });
  } else {
    document.querySelector("#overview").classList.remove("page-hidden");
  }
});
