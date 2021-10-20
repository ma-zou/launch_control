"use strict";
exports.__esModule = true;
module.exports = /** @class */ (function () {
    function HelloWorld() {
        this.name = "ansjdnakjsd";
        this.description = "asjndkajnsdkjasn ajsndkajsnd";
        this.version = "1.0.0";
        this.settings = {
            "test": "akmsdnmajksndk",
            "moin": "aksndkjansdkjanskdjnaksjdnaksnd"
        };
        this.trigger = [
            "test {query}",
            "moin",
            "test2",
            "waaas",
            "guess this could be a module"
        ];
    }
    HelloWorld.prototype.query = function (query) {
        return {
            message: "",
            success: true
        };
    };
    HelloWorld.prototype.submit = function () {
        return {
            message: "",
            success: true
        };
    };
    HelloWorld.prototype.createResultList = function () {
        return "ajksndkjanskjdnaksjndkajn";
    };
    return HelloWorld;
}());
//# sourceMappingURL=HelloWorld.js.map