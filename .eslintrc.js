module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  extends: [
    "eslint:recommended", // JS 建议
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended", // 关闭一些与 TS 重复的功能
    "plugin:@typescript-eslint/recommended" // TS 建议
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {}
};
