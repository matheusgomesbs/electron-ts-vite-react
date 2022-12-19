import { ipcRenderer } from "electron";

export interface IElectronRendererContext {
  getUsers(): Promise<string[]>;
  testeModule(): Promise<void>;
}

export const electronContext: IElectronRendererContext = {
  getUsers: async function (): Promise<string[]> {
    return await ipcRenderer.invoke('list-users');
  },
  testeModule: async function (): Promise<void> {
    return await ipcRenderer.invoke('test-module');
  }
}