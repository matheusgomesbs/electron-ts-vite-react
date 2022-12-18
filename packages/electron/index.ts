import { app, BrowserWindow, shell } from "electron";
import { release } from "os";
import path from "path";

import pkg from "../../package.json";
import { routesUser } from "./modules/user";

// Desativar aceleração de GPU para Windows 7
if (release().startsWith("6.1")) app.disableHardwareAcceleration();

// Definir o nome do aplicativo para notificações do Windows 10+
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

let win: BrowserWindow | null = null;

async function createWindow() {
  win = new BrowserWindow({
    title: pkg.productName,
    width: 1024,
    height: 640,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "../preload/index.cjs"),
    },
  });

  routesUser(win);

  win.setTitle(pkg.productName);

  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, "../vite/index.html"));
  } else {
    // 🚧 Use ['ENV_NAME'] evite vite:define plugin
    const url = `http://${process.env["VITE_DEV_SERVER_HOST"]}:${process.env["VITE_DEV_SERVER_PORT"]}`;

    win.loadURL(url);

    if (!app.isPackaged) {
      win.webContents.openDevTools({
        mode: "detach"
      });
    }
  }

  // Teste a mensagem do electron para o vite
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  // Abra todos os links com o navegador, não com o aplicativo
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);

    return {
      action: "deny"
    };
  });

  win.on("close", () => {
    win?.close();
  });

  win.once("ready-to-show", () => {
    // Executar no aplicativo estiver pronto para mostrar
  });

  win.on("page-title-updated", function (e) {
    e.preventDefault()
  });
}

app.whenReady().then(createWindow).then(async () => {
  // Executar no aplicativo estiver criado o janela principal

});

app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") app.quit(); process.exit(0);
});

app.on("before-quit", async function (evt) {
  if (process.platform !== "darwin") process.exit(0);
});

app.on("second-instance", () => {
  if (win) {
    // Foco na janela principal caso o usuário tente abrir outra
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();

  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});
