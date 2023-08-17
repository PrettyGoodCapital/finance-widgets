export default {
  bail: 5,
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "@finance-widgets/tools/tests/styleMock.js",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "@finance-widgets/tools/tests/fileMock.js",
  },
  preset: "ts-jest/presets/default-esm",
  reporters: ["default", "jest-junit"],
  slowTestThreshold: 20,
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/tests/**/?(*.)+(spec|test).[tj]s?(x)"],
  transform: {
    // '^.+\\.(ts|tsx)?$': ['ts-jest', { useESM: true }]
  },
  verbose: true,
};
