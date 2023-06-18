"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AnimesIdEpisodeRoute", {
    enumerable: true,
    get: function() {
        return AnimesIdEpisodeRoute;
    }
});
var _Route = require("../Route");
var _animesstore = require("../../store/animes.store");
function _assert_this_initialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
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
function _get_prototype_of(o) {
    _get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _get_prototype_of(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _set_prototype_of(subClass, superClass);
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function _possible_constructor_return(self, call) {
    if (call && (_type_of(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assert_this_initialized(self);
}
function _set_prototype_of(o, p) {
    _set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _set_prototype_of(o, p);
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _is_native_reflect_construct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _create_super(Derived) {
    var hasNativeReflectConstruct = _is_native_reflect_construct();
    return function _createSuperInternal() {
        var Super = _get_prototype_of(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _get_prototype_of(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possible_constructor_return(this, result);
    };
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
var AnimesIdEpisodeRoute = /*#__PURE__*/ function(Route) {
    "use strict";
    _inherits(AnimesIdEpisodeRoute, Route);
    var _super = _create_super(AnimesIdEpisodeRoute);
    function AnimesIdEpisodeRoute() {
        _class_call_check(this, AnimesIdEpisodeRoute);
        var _this;
        _this = _super.apply(this, arguments);
        _define_property(_assert_this_initialized(_this), "url", "/animes/:id/:episodeNumber");
        _define_property(_assert_this_initialized(_this), "method", "GET");
        _define_property(_assert_this_initialized(_this), "handler", function() {
            var _ref = _async_to_generator(function(request, reply) {
                return _ts_generator(this, function(_state) {
                    return [
                        2,
                        new Promise(function() {
                            var _ref = _async_to_generator(function(resolve, reject) {
                                var _request_params, id, episodeNumber, animeVostfr, animeVf, episode, EpisodeURIExist, reponse, episodeVfExist, episodeVf, datas;
                                return _ts_generator(this, function(_state) {
                                    switch(_state.label){
                                        case 0:
                                            _request_params = request.params, id = _request_params.id, episodeNumber = _request_params.episodeNumber;
                                            /* These are validation checks being performed on the `lang`, `id`, and `episode` parameters
      received in the request. */ if (isNaN(Number(id))) return [
                                                2,
                                                resolve(reply.status(400).send({
                                                    error: "Anime id must be a number."
                                                }))
                                            ];
                                            if (isNaN(Number(episodeNumber))) return [
                                                2,
                                                resolve(reply.status(400).send({
                                                    error: "Anime episode must be a number."
                                                }))
                                            ];
                                            animeVostfr = _animesstore.AnimeStore.vostfr.find(function(anime) {
                                                return anime.id === Number(id);
                                            });
                                            animeVf = _animesstore.AnimeStore.vf.find(function(anime) {
                                                return anime.id === Number(id);
                                            });
                                            /* These are error checks being performed on the `anime` object retrieved from the `AnimeStore`. */ if (!animeVostfr) return [
                                                2,
                                                resolve(reply.status(400).send({
                                                    error: "Anime with id ".concat(id, " not found.")
                                                }))
                                            ];
                                            return [
                                                4,
                                                _animesstore.AnimeStore.get(id, "vostfr")
                                            ];
                                        case 1:
                                            animeVostfr = _state.sent();
                                            if (animeVostfr.episodes.length < Number(episodeNumber)) return [
                                                2,
                                                resolve(reply.status(400).send({
                                                    error: "Anime with id ".concat(id, " has no episode ").concat(episodeNumber, ".")
                                                }))
                                            ];
                                            episode = animeVostfr.episodes[Number(episodeNumber) - 1];
                                            return [
                                                4,
                                                _animesstore.AnimeStore.getEpisodeVideo(episode)
                                            ];
                                        case 2:
                                            EpisodeURIExist = _state.sent();
                                            if (!EpisodeURIExist) return [
                                                2,
                                                resolve(reply.status(400).send({
                                                    error: "Anime with id ".concat(id, " has no episode ").concat(episodeNumber, ".")
                                                }))
                                            ];
                                            reponse = {
                                                vostfr: _object_spread({
                                                    videoUri: EpisodeURIExist.uri,
                                                    videoVtt: EpisodeURIExist.subtitlesVtt,
                                                    videoBaseUrl: EpisodeURIExist.baseUrl
                                                }, episode)
                                            };
                                            if (!animeVf) return [
                                                3,
                                                5
                                            ];
                                            return [
                                                4,
                                                _animesstore.AnimeStore.get(id, "vf")
                                            ];
                                        case 3:
                                            animeVf = _state.sent();
                                            episodeVfExist = false;
                                            if (animeVf.episodes.length < Number(episodeNumber)) episodeVfExist = false;
                                            else episodeVfExist = true;
                                            if (!episodeVfExist) return [
                                                3,
                                                5
                                            ];
                                            episodeVf = animeVf.episodes[Number(episodeNumber) - 1];
                                            return [
                                                4,
                                                _animesstore.AnimeStore.getEpisodeVideo(episodeVf)
                                            ];
                                        case 4:
                                            datas = _state.sent();
                                            if (datas) {
                                                reponse["vf"] = _object_spread({
                                                    videoUri: datas.uri,
                                                    videoVtt: datas.subtitlesVtt,
                                                    videoBaseUrl: datas.baseUrl
                                                }, episodeVf);
                                            }
                                            _state.label = 5;
                                        case 5:
                                            return [
                                                2,
                                                resolve(reply.status(200).send(reponse))
                                            ];
                                    }
                                });
                            });
                            return function(resolve, reject) {
                                return _ref.apply(this, arguments);
                            };
                        }())
                    ];
                });
            });
            return function(request, reply) {
                return _ref.apply(this, arguments);
            };
        }());
        return _this;
    }
    return AnimesIdEpisodeRoute;
}(_Route.Route);
