import { ipcRenderer } from "electron";

export interface IElectronRendererContext {
  getUsers(): Promise<string[]>;
}

export const electronContext: IElectronRendererContext = {
  getUsers: async function (): Promise<string[]> {
    return await ipcRenderer.invoke('list-users');
  }
}