import { builtinModules } from "module";
import { defineConfig } from "vite";
import esmodule from "vite-plugin-esmodule";

import pkg from "../../package.json";

export default defineConfig({
  root: __dirname,
  plugins: [
    esmodule([]),
  ],
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
})
