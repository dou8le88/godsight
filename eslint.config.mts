import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [
      "dist/**/*",
      "node_modules/**/*",
      "**/*.css",
      "config/*.js",
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: {
      js,
      pluginReact,
    },
    extends: [
      "js/recommended",
      pluginReact.configs.flat.recommended,
      pluginReact.configs.flat["jsx-runtime"],
      tseslint.configs.stylistic,
      tseslint.configs.recommended,
    ],
    languageOptions: {
      globals: globals.browser
    },
  },
  {
    files: [
      "**/*.css"
    ],
    plugins: {
      css
    },
    language: "css/css",
    extends: [
      "css/recommended",
    ]
  },
  {
    "settings": {
      "react": {
        "version": "detect",
      }
    }
  }
]);
