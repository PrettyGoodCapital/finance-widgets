import "@finance-widgets/core";
import "@finance-widgets/core-ui";
import "@finance-widgets/core-charts";
import "@finance-widgets/provider";
import "@finance-widgets/utilities";
import perspective from "@finos/perspective";
import "@finos/perspective-viewer";
import "@finos/perspective-viewer-datagrid";
import "@finos/perspective-viewer/dist/css/themes.css";
import "./index.css";

import { ProvidesSingle } from "@finance-widgets/core";
import { PerspectiveProvider } from "@finance-widgets/provider-perspective";
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

const perspectiveData = {
  ticker: ["ABC.N", "DEF.N", "GHI.N"],
  price: [1.23, 45.67, 89.1],
  change: [0.1, 0.25, -0.3],
};

window.setupPerspectiveContext = async () => {
  // Setup Perspective Table
  const worker = perspective.worker();
  const quoteTable = await worker.table(perspectiveData);
  const perspectiveViewer = document.getElementById("perspective-example-viewer");
  perspectiveViewer.load(quoteTable);
  perspectiveViewer.restore({ plugin_config: { editable: true } });

  let views = new Map();
  for (let ticker of perspectiveData.ticker) {
    views.set(ticker, await quoteTable.view({ filter: [["ticker", "==", ticker]] }));
  }

  // Setup perspective provider, connect to table
  const perspectiveProvider = new PerspectiveProvider(
    { single: { [ProvidesSingle.QuoteMini]: quoteTable } },
    {
      single: {
        [ProvidesSingle.QuoteMini]: async (that, ticker) => {
          const view = views.get(ticker);
          const data = await view.to_json();
          return data[0];
        },
      },
    },
    {
      single: {
        [ProvidesSingle.QuoteMini]: async (that, ticker) => {
          const view = views.get(ticker);
          return view.on_update.bind(view);
        },
      },
    },
  );
  const perspectiveContext = document.getElementById("perspective-provider-context");
  perspectiveContext.singleprovider.setValue(perspectiveProvider);

  const quoteMiniContainer = document.getElementById("perspective-quote-minis");
  perspectiveData.ticker.forEach((ticker) => {
    // create the element
    const qm = document.createElement("fw-quote-mini");
    qm.setAttribute("ticker", ticker);

    // Attach to perspective provider
    perspectiveProvider.registerQuoteMini(ticker, qm);

    // Attach to DOM
    quoteMiniContainer.appendChild(qm);
  });
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
