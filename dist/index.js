var _a = require('electron'), app = _a.app, globalShortcut = _a.globalShortcut, BrowserWindow = _a.BrowserWindow, Tray = _a.Tray, Menu = _a.Menu;
var path = require('path');
var IpcHandler = require('./ipcHandler.js');
var _b = require('./config.js'), DEBUG = _b.DEBUG, APP_NAME = _b.APP_NAME;
var windowSettings = {
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
};
if (DEBUG) {
    windowSettings.height = 1000;
    windowSettings.width = 1000;
    windowSettings.frame = true;
    windowSettings.skipTaskbar = false;
}
// Main process
IpcHandler.registerHandlers();
app.whenReady().then(function () {
    var mainWindow = new ElectronWindow(windowSettings).createWindow(path.join(__dirname, '/views/index.html'));
    var mainWindowContext = Menu.buildFromTemplate([
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
    mainWindow.createTray(mainWindowContext);
    IpcHandler.register('view:updateHeight', function (event, height) {
        if (!DEBUG) {
            mainWindow.window.setSize(500, height);
        }
    });
    IpcHandler.register('view:close', function (event) {
        mainWindow.closeWindow();
    });
    globalShortcut.register('Alt+Space', function () {
        if (!DEBUG)
            mainWindow.window.setSize(500, 75);
        mainWindow.openWindow();
    });
    if (!DEBUG) {
        mainWindow.window.on('blur', function () {
            mainWindow.closeWindow();
        });
    }
});
var ElectronWindow = /** @class */ (function () {
    function ElectronWindow(windowSettings) {
        this.windowSettings = windowSettings;
        this.icon = path.join(__dirname, '/views/assets/tray.ico');
    }
    ElectronWindow.prototype.createWindow = function (file) {
        this.window = new BrowserWindow(this.windowSettings);
        this.window.loadFile(file);
        if (DEBUG)
            this.window.webContents.openDevTools();
        return this;
    };
    ElectronWindow.prototype.openWindow = function () {
        this.window.center();
        this.window.show();
    };
    ElectronWindow.prototype.closeWindow = function () {
        this.window.hide();
    };
    ElectronWindow.prototype.removeWindow = function () {
    };
    ElectronWindow.prototype.createTray = function (contextMenu, icon) {
        this.tray;
        if (!icon)
            icon = this.icon;
        this.tray = new Tray(icon);
        this.tray.on('double-click', this.openWindow.bind(this));
        this.tray.setToolTip(APP_NAME);
        this.tray.setContextMenu(contextMenu);
        return this.tray;
    };
    return ElectronWindow;
}());
//# sourceMappingURL=index.js.map