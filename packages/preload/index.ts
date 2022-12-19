import { contextBridge } from "electron";
import fs from "fs";

import { electronContext } from "./context";
import { useLoading } from "./loading";
import { domReady } from "./utils";

const { appendLoading, removeLoading } = useLoading();

(async () => {
  await domReady();
  appendLoading();
})();

// --------- Expor alguma API do Electron para o Vite. ---------
contextBridge.exposeInMainWorld("fs", fs);
contextBridge.exposeInMainWorld("removeLoading", removeLoading);
contextBridge.exposeInMainWorld("electronContext", withPrototype(electronContext));

// contextBridge.exposeInMainWorld("ipcRenderer", withPrototype(ipcRenderer));
// `exposeInMainWorld` não pode detectar atributos e métodos de `prototype`, corrigindo manualmente.
function withPrototype(obj: Record<string, any>) {
  const protos = Object.getPrototypeOf(obj);

  for (const [key, value] of Object.entries(protos)) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) continue;

    if (typeof value === 'function') {
      // Algumas APIs nativas, como `NodeJS.EventEmitter['on']`, não funcionam no processo do Vite. Envolvendo-os em uma função.
      obj[key] = function (...args: any) {
        return value.call(obj, ...args);
      };
    } else {
      obj[key] = value;
    }
  }
  return obj;
}
