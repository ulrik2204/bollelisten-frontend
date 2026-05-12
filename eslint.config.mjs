import pluginQuery from "@tanstack/eslint-plugin-query";
import { defineConfig, globalIgnores } from "eslint/config";
import mantine from "eslint-config-mantine";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const eslintConfig = defineConfig([
  ...mantine,
  ...pluginQuery.configs["flat/recommended"],
  {
    plugins: { "simple-import-sort": simpleImportSort },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  globalIgnores([
    ".output/**",
    ".nitro/**",
    ".tanstack/**",
    "dist/**",
    "src/routeTree.gen.ts",
  ]),
]);

export default eslintConfig;
