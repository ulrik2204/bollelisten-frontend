import { defineConfig, globalIgnores } from "eslint/config";

import pluginNext from "@next/eslint-plugin-next";
import pluginQuery from "@tanstack/eslint-plugin-query";
import mantine from "eslint-config-mantine";
import prettier from "eslint-config-prettier/flat"; // note the /flat export

const eslintConfig = defineConfig([
  // Mantine rules (includes eslint, TS, jsx-a11y, etc.)
  ...mantine,

  // Next.js rules (no eslint-config-next, just the plugin)
  {
    plugins: {
      "@next/next": pluginNext,
    },
    rules: {
      // recommended + Core Web Vitals
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
    },
  },

  // TanStack Query recommended rules
  ...pluginQuery.configs["flat/recommended"],

  // Prettier – turns off formatting rules that conflict with Prettier
  prettier,

  // Ignores (replacement for .eslintignore)
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
