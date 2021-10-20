const { app, globalShortcut, BrowserWindow, Tray , Menu} = require('electron')
const path = require('path');


const IpcHandler = require('./ipcHandler.js')
const {DEBUG, APP_NAME} = require('./config.js')

const windowSettings = {
    webPreferences: {
        contextIsolation: false,
        nodeIntegration: true
    },
    height: 100,
    width: 500,
    show: false,
    frame: false,
    transparent: true,
    center: true,
    alwaysOnTop: true,
    skipTaskbar: true
}

if(DEBUG) {
    windowSettings.height = 1000
    windowSettings.width = 1000
    windowSettings.frame = true
    windowSettings.skipTaskbar = false
}


// Main process
IpcHandler.registerHandlers();

app.whenReady().then(() => {
    const mainWindow = new ElectronWindow(windowSettings).createWindow(path.join(__dirname, '/views/index.html'));
    const mainWindowContext = Menu.buildFromTemplate([
    {
        label: 'Show', click: function () {
        mainWindow.openWindow();
        }
    },
    // {
    //     label: 'Config', click: function () {
    //     console.log('config');
    //     if(configWin) {
    //         configWin.show()
    //     } else {
    //         let configSettings = windowSettings;
    //         configSettings.width = 800;
    //         configSettings.height = 600;
    //         configWin = new BrowserWindow(configSettings);
    //         configWin.loadFile('settings.html')
    //         configWin.show()
    //     }
    //     }
    // },
    {
        label: 'Exit', click: function () {
        app.isQuiting = true;
        app.quit();
        }
    }
    ]);
    mainWindow.createTray(mainWindowContext)

    IpcHandler.register('view:updateHeight', (event: object, height: bigint) => {
        if(!DEBUG) {
            mainWindow.window.setSize(500, height);
        }
    });

    IpcHandler.register('view:close', (event: object) => {
        mainWindow.closeWindow();
    });

    globalShortcut.register('Alt+Space', () => {
        if(!DEBUG) mainWindow.window.setSize(500, 75)
        mainWindow.openWindow();
    })

    if(!DEBUG) {
        mainWindow.window.on('blur', () => {
          mainWindow.closeWindow();
        })
      }
})

class ElectronWindow {
    windowSettings: object;
    icon: string;
    window: any;
    tray: typeof Tray;

    constructor(windowSettings: object) {
        this.windowSettings = windowSettings
        this.icon = path.join(__dirname, '/views/assets/tray.ico')
    }

    createWindow(file: string) {
        this.window = new BrowserWindow(this.windowSettings)
        this.window.loadFile(file)

        if(DEBUG) this.window.webContents.openDevTools();

        return this;
    }

    openWindow() {
        this.window.center();
        this.window.show();
    }

    closeWindow() {
        this.window.hide();
    }

    removeWindow() {

    }

    createTray(contextMenu: object, icon?: string) {
        this.tray
        if(!icon) icon = this.icon

        this.tray = new Tray(icon)

        this.tray.on('double-click', this.openWindow.bind(this))
        this.tray.setToolTip(APP_NAME)
        this.tray.setContextMenu(contextMenu)

        return this.tray
    }
}