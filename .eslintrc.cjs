module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier", "jest"],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        printWidth: 120,
        semi: true,
        singleQuote: false,
        tabWidth: 2,
        useTabs: false,
        trailingComma: "all",
      },
    ],
    camelcase: "off",
    "func-names": "off",
    eqeqeq: "error",
    "no-underscore-dangle": "off",
    "lines-between-class-members": "off",
    "import/prefer-default-export": "off",
  },
};
