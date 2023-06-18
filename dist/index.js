"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _GazeApi = require("./GazeApi");
var _Config = require("./Config");
var _Indexroute = /*#__PURE__*/ _interop_require_wildcard(require("./route/Index.route"));
var _Authmiddleware = require("./middleware/Auth.middleware");
require("reflect-metadata");
var _datasource = require("./data-source");
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
var gazeApi = new _GazeApi.GazeApi();
var RouterIndex = Object.values(_Indexroute);
gazeApi.handleRoutes(RouterIndex);
gazeApi.handleMiddleware([
    _Authmiddleware.AuthMiddleware
]);
gazeApi.fastify.addHook("onReady", function() {
    console.log("⚡ ready to use");
});
_datasource.AppDataSource.initialize().then(function() {
    console.log("\uD83D\uDDC3️  database initialized");
}).catch(function(error) {
    console.log("\uD83D\uDDC3️  database initialization failed");
    console.log(error);
});
gazeApi.start(_Config.Config.port);
