import { BrowserWindow, ipcMain } from "electron";

const testModule = async (window: BrowserWindow | null) => {
  ipcMain.handle('test-module', async (event, args) => {
    return window?.setTitle("test title changed");
  });
}

export { testModule };

