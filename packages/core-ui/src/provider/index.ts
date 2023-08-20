import { createContext, ContextRoot } from "@lit-labs/context";
import {
  SingleProvider,
  PortfolioProvider,
  SingleTargetProvider,
  PortfolioTargetProvider,
} from "@finance-widgets/core";

/* https://lit.dev/docs/data/context/ */
export const SingleProviderContext = createContext<SingleProvider>("singleprovider");
export const SingleTargetProviderContext = createContext<SingleTargetProvider>("singletargetprovider");

/* https://lit.dev/docs/data/context/ */
export const PortfolioProviderContext = createContext<PortfolioProvider>("portfolioprovider");
export const PortfolioTargetProviderContext = createContext<PortfolioTargetProvider>("portfoliotargetprovider");

document.addEventListener("DOMContentLoaded", () => {
  const root = new ContextRoot();
  root.attach(document.body);
});
