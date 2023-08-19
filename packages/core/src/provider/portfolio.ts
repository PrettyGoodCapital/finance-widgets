import { createContext } from "@lit-labs/context";
import { BaseProvider } from "./base";
import { QuoteMiniData } from "../types";

export enum ProvidesPortfolio {
  TickerTape,
}

export enum ProvidesPortfolioTarget {}

export interface PortfolioProvider extends BaseProvider {
  providesPortfolio: () => ProvidesPortfolio[];
  registerTickerTape: (tickerTapeElement: HTMLElement) => void;
  getTickerTape: () => Array<QuoteMiniData>;
}

export interface PortfolioTargetProvider extends BaseProvider {
  providesPortfolioTarget: () => ProvidesPortfolioTarget[];
}

/* https://lit.dev/docs/data/context/ */
export const PortfolioProviderContext = createContext<PortfolioProvider>("portfolioprovider");
export const PortfolioTargetProviderContext = createContext<PortfolioTargetProvider>("portfoliotargetprovider");
