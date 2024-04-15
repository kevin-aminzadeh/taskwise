module.exports = {
  root: true,
  extends: ["universe/native", "prettier"],
  rules: {
    // Ensures props and state inside functions are always up-to-date
    "react-hooks/exhaustive-deps": "warn",
    "import/order": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
  plugins: ["simple-import-sort"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
  },
};
