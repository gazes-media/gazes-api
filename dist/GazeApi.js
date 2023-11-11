"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true,
});
Object.defineProperty(exports, "GazeApi", {
    enumerable: true,
    get: function () {
        return GazeApi;
    },
});
var _cors = /*#__PURE__*/ _interop_require_default(require("@fastify/cors"));
var _multipart = /*#__PURE__*/ _interop_require_default(require("@fastify/multipart"));
var _child_process = require("child_process");
var _fastify = /*#__PURE__*/ _interop_require_default(require("fastify"));
var _animesstore = require("./store/animes.store");
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
    return function () {
        var self = this,
            args = arguments;
        return new Promise(function (resolve, reject) {
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
    for (var i = 0; i < props.length; i++) {
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
            writable: true,
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _interop_require_default(obj) {
    return obj && obj.__esModule
        ? obj
        : {
              default: obj,
          };
}
function _ts_generator(thisArg, body) {
    var f,
        y,
        t,
        g,
        _ = {
            label: 0,
            sent: function () {
                if (t[0] & 1) throw t[1];
                return t[1];
            },
            trys: [],
            ops: [],
        };
    return (
        (g = {
            next: verb(0),
            throw: verb(1),
            return: verb(2),
        }),
        typeof Symbol === "function" &&
            (g[Symbol.iterator] = function () {
                return this;
            }),
        g
    );
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_)
            try {
                if (((f = 1), y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)) return t;
                if (((y = 0), t)) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:
                    case 1:
                        t = op;
                        break;
                    case 4:
                        _.label++;
                        return {
                            value: op[1],
                            done: false,
                        };
                    case 5:
                        _.label++;
                        y = op[1];
                        op = [0];
                        continue;
                    case 7:
                        op = _.ops.pop();
                        _.trys.pop();
                        continue;
                    default:
                        if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;
                            continue;
                        }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
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
                op = [6, e];
                y = 0;
            } finally {
                f = t = 0;
            }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true,
        };
    }
}
var GazeApi = /*#__PURE__*/ (function () {
    "use strict";
    function GazeApi() {
        _class_call_check(this, GazeApi);
        _define_property(this, "fastify", void 0);
        this.fastify = (0, _fastify.default)();
        this.fastify.register(_cors.default, {
            allowedHeaders: "*",
        });
    }
    _create_class(GazeApi, [
        {
            key: "handleRoutes",
            value: function handleRoutes(routes) {
                var _iteratorNormalCompletion = true,
                    _didIteratorError = false,
                    _iteratorError = undefined;
                try {
                    for (var _iterator = routes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var route = _step.value;
                        var options = new route();
                        this.fastify.route(options);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            },
        },
        {
            key: "handleMiddleware",
            value: /* This function adds middleware hooks to a Fastify server instance. */ function handleMiddleware(middlewares) {
                var _iteratorNormalCompletion = true,
                    _didIteratorError = false,
                    _iteratorError = undefined;
                try {
                    for (var _iterator = middlewares[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var middleware = _step.value;
                        this.fastify.addHook("preValidation", new middleware().handle);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            },
        },
        {
            key: "start",
            value: /* This function starts a server on a specified port and initializes a Firebase admin instance. */ function start(port) {
                var _this = this;
                return _async_to_generator(function () {
                    return _ts_generator(this, function (_state) {
                        switch (_state.label) {
                            case 0:
                                return [4, _this.toggleSmartCache()];
                            case 1:
                                _state.sent();
                                return [4, _this.fastify.register(_multipart.default)];
                            case 2:
                                _state.sent();
                                _this.fastify.listen(
                                    {
                                        host: "0.0.0.0",
                                        port: port,
                                    },
                                    function (err, adress) {
                                        if (err) {
                                            console.error(err);
                                            return;
                                        }
                                        console.log("Server is starting on ".concat(adress));
                                    },
                                );
                                return [2];
                        }
                    });
                })();
            },
        },
        {
            key: "toggleSmartCache",
            value: /* This function toggles a smart cache by fetching and getting the latest episodes 
  of animes, and refreshing the cache every 10 minutes. */ function toggleSmartCache() {
                var _this = this;
                return _async_to_generator(function () {
                    return _ts_generator(this, function (_state) {
                        _this.smartCache();
                        setInterval(_this.smartCache, 600000);
                        return [2];
                    });
                })();
            },
        },
        {
            key: "smartCache",
            value: /**
             * Refreshes the cache by fetching all anime and the latest anime from the AnimeStore,
             * and runs a script to refresh the cache.
             * @returns {Promise<void>} A Promise that resolves when the cache has been refreshed.
             */ function smartCache() {
                return _async_to_generator(function () {
                    var tri;
                    return _ts_generator(this, function (_state) {
                        switch (_state.label) {
                            case 0:
                                return [4, _animesstore.AnimeStore.fetchAll()];
                            case 1:
                                _state.sent();
                                return [4, _animesstore.AnimeStore.fetchLatest()];
                            case 2:
                                _state.sent();
                                console.log("♻️ cache refreshed (".concat(_animesstore.AnimeStore.all.length, " animes)"));
                                tri = (0, _child_process.spawn)("node", ["".concat(__dirname, "/../scripts/tri.js")]);
                                tri.on("close", function (code) {
                                    return console.log;
                                });
                                tri.stdout.on("data", function (data) {
                                    return console.log(data.toString());
                                });
                                return [2];
                        }
                    });
                })();
            },
        },
    ]);
    return GazeApi;
})();
