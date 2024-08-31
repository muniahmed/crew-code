module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react/jsx-no-target-blank": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "no-unused-vars": [
      "warn", // Show warnings instead of errors for unused variables
      { vars: "all", args: "after-used", ignoreRestSiblings: true },
    ],
    "react/prop-types": "off", // Turn off prop-types rule if not using PropTypes
    "no-console": "off", // Allow console statements for debugging
    "react/react-in-jsx-scope": "off", // Disable for React 17+ or Next.js with JSX automatic runtime
  },
};
