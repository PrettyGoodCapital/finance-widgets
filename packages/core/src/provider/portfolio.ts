import { BaseProvider } from "./base";
import { QuoteMiniData } from "../types";

export enum ProvidesPortfolio {
  TickerTape,
}

export enum ProvidesPortfolioTarget {}

export interface PortfolioProvider extends BaseProvider {
  providesPortfolio: () => ProvidesPortfolio[] | undefined;
  tickers: () => string[];

  /* core */
  registerTickerTape: (tickers: string[], tickerTapeElement: HTMLElement) => Promise<void>;
  getTickerTape: (tickers: string[]) => Promise<Array<QuoteMiniData>> | undefined;
  /* charts */
}

export interface PortfolioTargetProvider extends BaseProvider {
  providesPortfolioTarget: () => ProvidesPortfolioTarget[];
  tickerTargets: () => string[];
}
