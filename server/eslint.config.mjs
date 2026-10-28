import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tseslintParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.Config} */
export default {
  overrides: [
    {
      files: ["**/*.{js,mjs,cjs,ts}"],
      languageOptions: {
        parser: tseslintParser,
        globals: globals.browser,
      },
      rules: {
        eqeqeq: "off",
        "no-unused-vars": "error",
        "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
      },
    },
  ],
  ignorePatterns: [".node_modules/*"],
  extends: [
    pluginJs.configs.recommended,
    tseslint.configs.recommended,
    prettierConfig,
  ],
};
