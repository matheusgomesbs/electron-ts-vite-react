import { PrismaClient } from "@prisma/client";
import { BrowserWindow, ipcMain } from "electron";

const prisma = new PrismaClient();

const routesUser = async (window: BrowserWindow | null) => {
  ipcMain.handle('list-users', async (event, args) => {
    return await prisma.user.findMany();
  });
}

export { routesUser };

