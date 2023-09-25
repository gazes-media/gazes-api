"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GazeApi", {
    enumerable: true,
    get: function() {
        return GazeApi;
    }
});
var _fastify = /*#__PURE__*/ _interop_require_default(require("fastify"));
var _firebaseadmin = /*#__PURE__*/ _interop_require_wildcard(require("firebase-admin"));
var _app = require("firebase-admin/app");
var _multipart = /*#__PURE__*/ _interop_require_default(require("@fastify/multipart"));
var _animesstore = require("./store/animes.store");
var _cors = /*#__PURE__*/ _interop_require_default(require("@fastify/cors"));
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
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
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return(g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g);
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var GazeApi = /*#__PURE__*/ function() {
    "use strict";
    function GazeApi() {
        _class_call_check(this, GazeApi);
        _define_property(this, "fastify", void 0);
        this.fastify = (0, _fastify.default)();
        this.fastify.register(_cors.default, {
            allowedHeaders: "*"
        });
    }
    _create_class(GazeApi, [
        {
            key: "handleRoutes",
            value: function handleRoutes(routes) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = routes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var route = _step.value;
                        var options = new route();
                        this.fastify.route(options);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        },
        {
            key: "handleMiddleware",
            value: /* This function adds middleware hooks to a Fastify server instance. */ function handleMiddleware(middlewares) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = middlewares[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var middleware = _step.value;
                        this.fastify.addHook("preValidation", new middleware().handle);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        },
        {
            key: "start",
            value: /* This function starts a server on a specified port and initializes a Firebase admin instance. */ function start(port) {
                var _this = this;
                return _async_to_generator(function() {
                    var serviceAccount;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    _this.toggleSmartCache()
                                ];
                            case 1:
                                _state.sent();
                                return [
                                    4,
                                    _this.fastify.register(_multipart.default)
                                ];
                            case 2:
                                _state.sent();
                                serviceAccount = require("../animaflix-53e15-firebase-adminsdk-xvjq7-2c13172613.json");
                                _firebaseadmin.initializeApp({
                                    credential: (0, _app.cert)(serviceAccount),
                                    databaseURL: "https://animaflix-53e15-default-rtdb.europe-west1.firebasedatabase.app/"
                                }, "animaflix");
                                _this.fastify.listen({
                                    port: port
                                }, function(err, adress) {
                                    if (err) {
                                        console.error(err);
                                        return;
                                    }
                                    console.log("Server is starting on ".concat(adress));
                                });
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "toggleSmartCache",
            value: /* This function toggles a smart cache by fetching and getting the latest episodes 
  of animes, and refreshing the cache every 10 minutes. */ function toggleSmartCache() {
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            new Promise(function() {
                                var _ref = _async_to_generator(function(resolve) {
                                    return _ts_generator(this, function(_state) {
                                        if (!_animesstore.AnimeStore.all[0]) {
                                            _animesstore.AnimeStore.fetchAll();
                                            _animesstore.AnimeStore.fetchLatest();
                                            console.log("".concat(_animesstore.AnimeStore.all.length, " animes loaded (vf+vostfr)"));
                                            resolve(null);
                                        }
                                        setInterval(function() {
                                            _animesstore.AnimeStore.fetchAll();
                                            _animesstore.AnimeStore.fetchLatest();
                                            console.log("♻️ cache refreshed");
                                        }, 600000);
                                        return [
                                            2
                                        ];
                                    });
                                });
                                return function(resolve) {
                                    return _ref.apply(this, arguments);
                                };
                            }())
                        ];
                    });
                })();
            }
        }
    ]);
    return GazeApi;
}();
