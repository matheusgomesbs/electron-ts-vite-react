import { builtinModules } from "module";
import { join } from "path";
import { defineConfig } from "vite";

import pkg from "../../package.json";

export default defineConfig({
  root: __dirname,
  build: {
    outDir: '../../dist/main',
    lib: {
      entry: 'index.ts',
      formats: ['cjs'],
      fileName: () => '[name].cjs',
    },
    minify: process.env.NODE_ENV === 'production',
    sourcemap: true,
    rollupOptions: {
      external: [
        'electron',
        ...builtinModules,
        ...Object.keys(pkg.dependencies || {}),
      ],
    },
  },
  resolve: {
    alias: {
      "@config": join(__dirname, "config"),
      "@modules": join(__dirname, "modules"),
    },
  },
})
