import { createContext } from "@lit-labs/context";
import { QuoteMiniData } from "./types";

export interface BaseProvider {
  registerTickerTape: (tickerTapeElement: HTMLElement) => void;
  getTickerTape: () => Array<QuoteMiniData>;
}

/* https://lit.dev/docs/data/context/ */
export const providerContext = createContext<BaseProvider>("provider");
