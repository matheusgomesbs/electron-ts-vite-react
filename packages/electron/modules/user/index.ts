import { prisma } from "@config/prisma";
import { BrowserWindow, ipcMain } from "electron";


const userModule = async (window: BrowserWindow | null) => {
  ipcMain.handle('list-users', async (event, args) => {
    return await prisma.user.findMany();
  });
}

export { userModule };

