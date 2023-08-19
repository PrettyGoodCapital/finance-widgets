const esModules = ["d3fc", "d3", "d3-array"].join("|");

export default {
  bail: 5,
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  // extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "@finance-widgets/tools/tests/styleMock.js",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "@finance-widgets/tools/tests/fileMock.js",
    d3: "<rootDir>/../../node_modules/d3/dist/d3.min.js",
  },
  preset: "ts-jest/presets/default-esm",
  reporters: ["default", "jest-junit"],
  setupFiles: ["@finance-widgets/tools/tests/setup.js"],
  slowTestThreshold: 20,
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/tests/**/?(*.)+(spec|test).[tj]s?(x)"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    // "^.+\\.(ts|tsx)?$": ["ts-jest", { useESM: true }],
    // ".+\\.(css|styl|less|sass|scss)$": "jest-transform-css",
  },
  transformIgnorePatterns: [`/node_modules/(?!(${esModules}))`],
  verbose: true,
};
