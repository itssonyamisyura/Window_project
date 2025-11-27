import globals from "globals";
import { defineConfig } from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
  { files: ["src/**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
  { files: ["src/**/*.js"], plugins: { js }, extends: ["js/recommended"] },
]);
