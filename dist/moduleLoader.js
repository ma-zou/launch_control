var ModuleLoader = /** @class */ (function () {
    function ModuleLoader(modules) {
        var _this = this;
        this.modules = {};
        modules.forEach(function (moduleName) {
            var moduleClass = require("./lc_modules/" + moduleName + ".js");
            var entry = {
                "class": moduleClass,
                instance: new moduleClass()
            };
            _this.modules[moduleName] = entry;
        });
    }
    return ModuleLoader;
}());
function moduleNameByTrigger(trigger, moduleList) {
    var name;
    Object.keys(moduleList).forEach(function (moduleName) {
        if (moduleList[moduleName].instance.trigger.indexOf(trigger) != -1) {
            name = moduleName;
        }
    });
    return name;
}
module.exports = {
    loader: ModuleLoader,
    triggerSearch: moduleNameByTrigger
};
//# sourceMappingURL=moduleLoader.js.map