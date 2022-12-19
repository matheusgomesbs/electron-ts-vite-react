import { BrowserWindow } from "electron";

import { userModule } from "@modules/user";

export const useModules = (window: BrowserWindow | null) => {
  userModule(window);
}