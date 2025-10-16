import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import react from "eslint-plugin-react";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js, react },
    extends: ["js/recommended"],

    languageOptions: { globals: { ...globals.browser, React: true } },
    rules: {
      "react/self-closing-comp": [
        "error",
        {
          component: true,
          html: true,
        },
      ],
    },
  },

  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
]);
