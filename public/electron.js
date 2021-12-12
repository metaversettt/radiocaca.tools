const electron = require("electron");
const { app, BrowserWindow, globalShortcut, Menu, Tray } = electron;
const isDev = require("electron-is-dev");
const AutoLaunch = require("auto-launch");
app.commandLine.appendSwitch("disable-http-cache");

let mainWindow = null;
let tray = null;
const options = {
  resizable: true,
  frame: true,
  webPreferences: {
    nodeIntegration: true,
    devTools: true,
  },
  icon: `${__dirname}\\logo.ico`,
  title: "RADIO RACA SUPPORT TOOLS",
};

const createWindow = () => {
  mainWindow = new BrowserWindow(options);
  mainWindow.setMenuBarVisibility(false);
  mainWindow.maximize();

  if (isDev) mainWindow.loadURL(`http://localhost:3000`);
  else mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.webContents.on("will-navigate", (event) => {
    event.preventDefault();
  });

  globalShortcut.register("F5", () => {
    mainWindow.reload();
  });

  mainWindow.on("close", function(event) {
    event.preventDefault();
    mainWindow.hide();
  });
};

const createTray = () => {
  tray = new Tray(`${__dirname}\\logo.ico`);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show",
      click: () => {
        mainWindow.show();
      },
    },
    {
      label: "Restart",
      click: () => {
        app.quit();
        app.relaunch();
      },
    },
    {
      label: "Exit",
      click: () => {
        mainWindow.destroy();
        app.quit();
      },
    },
  ]);
  tray.setToolTip("RACA Tools");
  tray.on("click", (event) => {
    if (mainWindow.isVisible()) mainWindow.hide();
    else mainWindow.show();
  });
  tray.setContextMenu(contextMenu);
};

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (event, commandLine, workingDirectory) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      else if (!mainWindow.isVisible()) mainWindow.show();
      mainWindow.focus();
    }
  });

  app.on("ready", () => {
    createWindow();
    createTray();
  });

  app.on("window-all-closed", () => {
    app.quit();
  });

  app.on("activate", () => {
    if (mainWindow === null) createWindow();
  });

  app.on("will-quit", () => globalShortcut.unregisterAll());
}

if (app.isPackaged) {
  const autoLauncher = new AutoLaunch({ name: "RACA Tools" });
  autoLauncher.enable();
  autoLauncher
    .isEnabled()
    .then((isEnabled) => {
      if (isEnabled) {
        return;
      }
      autoLauncher.enable();
    })
    .catch((error) => {
      console.error(`[autoLauncher][${api}]`, error.message);
    });
}
