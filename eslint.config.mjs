import { defineConfig, globalIgnores } from "eslint/config";

import pluginQuery from "@tanstack/eslint-plugin-query";
import mantine from "eslint-config-mantine";
import prettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  ...mantine,
  ...pluginQuery.configs["flat/recommended"],
  prettier,
  globalIgnores([
    ".output/**",
    ".nitro/**",
    ".tanstack/**",
    "dist/**",
    "src/routeTree.gen.ts",
  ]),
]);

export default eslintConfig;
