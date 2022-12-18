import { build, createServer } from "vite";

/**
 * @type {(server: import('vite').ViteDevServer) => Promise<import('rollup').RollupWatcher>}
 */
function watchElectron(server) {
  /**
   * @type {import('child_process').ChildProcessWithoutNullStreams | null}
   */

  return build({
    configFile: "packages/electron/vite.config.ts",
    mode: "development",
    // plugins: [!debug && startElectron].filter(Boolean),
    build: {
      watch: true,
    },
  });
}


// bootstrap
const server = await createServer({ configFile: "packages/vite/react.config.ts" });
console.log("http://localhost:3000/");
await watchElectron(server);
await server.listen();
