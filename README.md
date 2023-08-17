# Finance Widgets
Library of reusable, composable javascript widgets for financial data.

[![Build Status](https://github.com/prettygoodcapital/finance-widgets/workflows/Build%20Status/badge.svg?branch=main)](https://github.com/prettygoodcapital/finance-widgets/actions?query=workflow%3A%22Build+Status%22)
[![License](https://img.shields.io/npm/l/@finance-widgets/core.svg)](https://www.npmjs.com/package/@finance-widgets/core)
[![npm](https://img.shields.io/npm/v/@finance-widgets/core.svg)](https://www.npmjs.com/package/@finance-widgets/core)

[![Storybook](https://img.shields.io/badge/Storybook-blue?style=for-the-badge)](https://prettygoodcapital.github.io/finance-widgets/)


## UI Components

| Component | Package | Description | 
|:----------|:--------|:------------|
| [fw-quote-mini](./packages/core-ui/) | `core-ui` | |
| [fw-quote](./packages/core-ui/)      | `core-ui` | |
| [fw-tickertape](./packages/core-ui/) | `core-ui` | |


## Providers


### Builtin
The following providers are supported natively through `@finance-widgets/provider`

| Provider         | Description           |
|:-----------------|:----------------------|
| `RandomProvider` | Random data generator |


### External

The following partners have native data integration

|     | Name | Data | Description | Provider |
|:---:|:-----|:-----|:------------|:---------|
| <a href="https://polygon.io/"><img src="docs/img/logo.png" width="200"></a> | [Polygon.io](https://polygon.io/) | Equities, Options, Forex, Crypto | Free stock data APIs. Real time and historical data, unlimited usage, tick level and aggregate granularity, in standardized JSON and CSV formats. Plus currencies data, including forex, crypto, and more. | `@finance-widgets/provider-polygon` |
