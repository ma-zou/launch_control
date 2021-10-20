const fs = require('fs')
const { ipcMain } = require('electron')
const settingsObj = require('./settings.json')
const {loader, triggerSearch}  = require('./moduleLoader.js')

const modules = new loader(settingsObj.modules).modules;

const handlers = new Map();

handlers.set(
    "settings:getAll",
    async (event: object) => {
        return settingsObj
    }
)
handlers.set(
    "settings:get",
     async (event: object, name: string) => {
        return (settingsObj[name]) ? settingsObj : false
    }
)

handlers.set(
    "settings:set",
     async (event: object, name: string, value: string) => {
        settingsObj[name] = value;
        fs.writeFile('./settings.json', settingsObj).then(() => {
            return settingsObj
        })
    }
)

handlers.set(
    "modules:getTrigger",
     async (event: object) => {
        let list: Array<string> = [];


        Object.keys(modules).forEach(moduleName => {
            list = [...modules[moduleName].instance.trigger]
        })
        return list
    }
)

handlers.set(
    "modules:run",
    async (event: object, trigger: string, args?: Array<any>) => {
        let result: any;
        let name: string = triggerSearch(trigger, modules);

        if(args) {
            result = modules[name].instance.run(name, ...args);
        } else {
            result = modules[name].instance.run(name)
        }
        if(result) {
            return result;
        } else {
            return false;
        }
    }
)

module.exports = class IpcHandler {
    static registerHandlers() {
        handlers.forEach((value: Function, key: string) => {
            IpcHandler.register(key, value);
        });
    }
    static register(name: string, handler: Function) {
        ipcMain.handle(name, handler)
    }
}