import react from "@vitejs/plugin-react";
import { builtinModules } from "module";
import { join } from "path";
import { defineConfig, Plugin } from "vite";
import optimizer from "vite-plugin-optimizer";

import pkg from "../../package.json";

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  mode: process.env.NODE_ENV,
  root: __dirname,
  plugins: [
    react(),
    resolveElectron(
      /**
       * Here you can specify other modules
       * 🚧 You have to make sure that your module is in `dependencies` and not in the` devDependencies`,
       *    which will ensure that the electron-builder can package it correctly
       * @example
       * {
       *   'electron-store': 'const Store = require("electron-store"); export default Store;',
       * }
       */
      {
      },
    ),
  ],
  base: "./",
  build: {
    sourcemap: true,
    outDir: "../../dist/vite",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": join(__dirname, "src"),
    },
  },
  server: {
    host: pkg.env.VITE_DEV_SERVER_HOST,
    port: pkg.env.VITE_DEV_SERVER_PORT,
  },
})

/**
 * Para uso de APIs Electron e NodeJS no processo de renderização
 * @see https://github.com/caoxiemeihao/electron-vue-vite/issues/52
 */
export function resolveElectron(
  entries: Parameters<typeof optimizer>[0] = {}
): Plugin {
  const builtins = builtinModules.filter((t) => !t.startsWith('_'))

  /**
   * @see https://github.com/caoxiemeihao/vite-plugins/tree/d008b8d5ef9ec331856ea9113257b7772a1647e1/packages/resolve#readme
   */
  return optimizer({
    electron: electronExport(),
    ...builtinModulesExport(builtins),
    ...entries,
  })

  function electronExport() {
    return `
    /**
     * Para todos os módulos exportados, consulte 
     * https://www.electronjs.org/docs/latest/api/clipboard
     * -> Renderer Process Modules
    */
    const electron = require("electron");
    const {
      clipboard,
      nativeImage,
      shell,
      contextBridge,
      crashReporter,
      ipcRenderer,
      webFrame,
      desktopCapturer,
      deprecate,
    } = electron;

    export {
      electron as default,
      clipboard,
      nativeImage,
      shell,
      contextBridge,
      crashReporter,
      ipcRenderer,
      webFrame,
      desktopCapturer,
      deprecate,
    }
    `
  }

  function builtinModulesExport(modules: string[]) {
    return modules
      .map((moduleId) => {
        const nodeModule = require(moduleId)
        const requireModule = `const M = require("${moduleId}");`
        const exportDefault = `export default M;`
        const exportMembers =
          Object.keys(nodeModule)
            .map((attr) => `export const ${attr} = M.${attr}`)
            .join(';\n') + ';'
        const nodeModuleCode =
          `
          ${requireModule}
          ${exportDefault}
          ${exportMembers}
          `
        return {
          [moduleId]: nodeModuleCode
        }
      })
      .reduce((memo, item) => Object.assign(memo, item), {});
  }
}
