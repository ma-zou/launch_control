interface LC_Module {
    class: any;
    instance: any;
}


class ModuleLoader {
    modules:  Record<string, LC_Module>;

    constructor(modules: Array<string>) {
        this.modules = {}

        modules.forEach((moduleName: string) => {
            let moduleClass = require(`./lc_modules/${moduleName}.js`);
            let entry: LC_Module = {
                class: moduleClass,
                instance: new moduleClass()
            }
            this.modules[moduleName] = entry;
        });
    }
}

function moduleNameByTrigger(trigger: string, moduleList: Record<string, LC_Module>) {
    let name: string;

    Object.keys(moduleList).forEach(moduleName => {
        if(moduleList[moduleName].instance.trigger.indexOf(trigger) != -1) {
            name = moduleName;
        }
    })

    return name;
}

module.exports = {
    loader: ModuleLoader,
    triggerSearch: moduleNameByTrigger
  }