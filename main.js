const { app, BrowserWindow, ipcMain, dialog, globalShortcut, Tray, Menu  } = require('electron');
const { exec } = require('child_process');
const path = require('path');

const debug = false;

let win, tray, configWin, windowSettings;

ipcMain.on('resize', (event, height) => {
  if(!debug) win.setSize(500, height)
});

ipcMain.on('settings_close', (event) => {
  configWin.hide();
});

ipcMain.on('process_exec', (event, command, cwd) => {
  if(cwd) {
    exec(`${command}`, {cwd: cwd}, (err, stdout, stderr) => {
      console.log(`executed "${command}"`);
    });
  } else {
    exec(`${command}`, (err, stdout, stderr) => {
      console.log(`executed "${command}"`);
    });
  }
  win.minimize()
})

ipcMain.on('close', (event) => {
  win.hide();
  tray = createTray();
});

app.whenReady().then(() => {
  createWindow();

  globalShortcut.register('Alt+Space', () => {
    if(!debug) win.setSize(500, 75)
    win.center()
    win.show();
    tray.destroy();
  })
});

function createWindow () {
  // Erstelle das Browser-Fenster.
  windowSettings = {
    allowEval: true,
    height: 100,
    width: 500,
    show: false,
    frame: false,
    transparent: true,
    center: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  }
  if(debug) {
    windowSettings.height = 1000;
    windowSettings.width = 1000;
    windowSettings.frame = true;
  }
  win = new BrowserWindow(windowSettings);
  // und lade den Inhalt von index.html.
  win.loadFile('index.html')
  win.minimize();
  tray = createTray();

  win.on('minimize', function (event) {
    event.preventDefault();
    win.hide();
    tray = createTray();
  });

  win.on('restore', function (event) {
    if(!debug) win.setSize(500, 75)
    win.center()
    win.show();
    tray.destroy();
  });

  if(!debug) {
    win.on('blur', (event) => {
      win.hide();
      tray = createTray();
    })
  }
}

function createTray() {
  let iconPath = path.join(__dirname, '/assets/tray.ico');
  console.log(iconPath);
  let appIcon = new Tray(iconPath);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show', click: function () {
        win.show();
      }
    },
    {
      label: 'Config', click: function () {
        console.log('config');
        if(configWin) {
          configWin.show()
        } else {
          let configSettings = windowSettings;
          configSettings.width = 800;
          configSettings.height = 600;
          configWin = new BrowserWindow(configSettings);
          configWin.loadFile('settings.html')
          configWin.show()
        }
      }
    },
    {
      label: 'Exit', click: function () {
        app.isQuiting = true;
        app.quit();
      }
    }
  ]);

  appIcon.on('double-click', function (event) {
      win.show();
  });
  appIcon.setToolTip('Launch Control');
  appIcon.setContextMenu(contextMenu);
  return appIcon;
}