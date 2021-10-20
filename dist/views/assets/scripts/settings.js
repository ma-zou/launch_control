const { ipcRenderer } = require('electron')

class Settings {
    static async load() {
        Settings.list = await ipcRenderer.invoke('settings:getAll')
        return Settings.list;
    }

    static async get(name) {
        if(!Settings.list) Settings.load();
        return await ipcRenderer.invoke('settings:get', name);
    }

    static async set(name, value) {
        if(!Settings.list) Settings.load();
        return await ipcRenderer.invoke('settings:set', name, value)
    }
}

export default Settings