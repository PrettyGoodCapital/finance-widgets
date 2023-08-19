import { createContext } from "@lit-labs/context";
import { BaseProvider } from "./base";
import { QuoteData, QuoteMiniData } from "../types";

export enum ProvidesSingle {
  QuoteMini,
  Quote,
}

export enum ProvidesSingleTarget {}

export interface SingleProvider extends BaseProvider {
  providesSingle: () => ProvidesSingle[];
  registerQuote: (quoteElement: HTMLElement) => void;
  getQuote: () => QuoteData;
  registerQuoteMini: (quoteMiniElement: HTMLElement) => void;
  getQuoteMini: () => QuoteMiniData;
}

export interface SingleTargetProvider extends BaseProvider {
  providesSingleTarget: () => ProvidesSingleTarget[];
}

/* https://lit.dev/docs/data/context/ */
export const SingleProviderContext =
  createContext<SingleProvider>("singleprovider");
export const SingleTargetProviderContext = createContext<SingleTargetProvider>(
  "singletargetprovider",
);
