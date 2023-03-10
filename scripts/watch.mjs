import { spawn } from "child_process";
import electron from "electron";
import { build, createServer } from "vite";

const query = new URLSearchParams(import.meta.url.split("?")[1]);
const debug = query.has("debug");

/**
 * @type {(server: import('vite').ViteDevServer) => Promise<import('rollup').RollupWatcher>}
 */
function watchElectron(server) {
  /**
   * @type {import('child_process').ChildProcessWithoutNullStreams | null}
   */
  let electronProcess = null
  const address = server.httpServer.address()
  const env = Object.assign(process.env, {
    VITE_DEV_SERVER_HOST: address.address,
    VITE_DEV_SERVER_PORT: address.port,
  });

  /**
   * @type {import('vite').Plugin}
   */
  const startElectron = {
    name: "electron-main-watcher",
    writeBundle() {
      if (electronProcess) {
        electronProcess.removeAllListeners();
        electronProcess.kill();
      }
      electronProcess = spawn(electron, ["."], { stdio: "inherit", env });
      electronProcess.once("exit", process.exit);
    },
  }

  return build({
    configFile: "packages/electron/vite.config.ts",
    mode: "development",
    plugins: [!debug && startElectron].filter(Boolean),
    build: {
      watch: true,
    },
  })
}

/**
 * @type {(server: import('vite').ViteDevServer) => Promise<import('rollup').RollupWatcher>}
 */
function watchPreload(server) {
  return build({
    configFile: "packages/preload/vite.config.ts",
    mode: "development",
    plugins: [{
      name: "electron-preload-watcher",
      writeBundle() {
        server.ws.send({ type: "full-reload" });
      },
    }],
    build: {
      watch: true,
    },
  });
}

// bootstrap
const server = await createServer({
  configFile: "packages/vite/vite.config.ts"
});

await server.listen();
await watchPreload(server);
await watchElectron(server);
