import { BrowserWindow } from "electron";

import { userModule } from "@modules/user";
import { testModule } from "./teste";

export const useModules = (window: BrowserWindow | null) => {
  userModule(window);
  testModule(window);
}