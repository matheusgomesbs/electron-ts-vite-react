import { build } from "vite";

await build({ configFile: "packages/electron/vite.config.ts" });
await build({ configFile: "packages/preload/vite.config.ts" });
await build({ configFile: "packages/vite/vite.config.ts" });
