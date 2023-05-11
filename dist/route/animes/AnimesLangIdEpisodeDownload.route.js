"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AnimesLangIdEpisodeDownloadRoute", {
    enumerable: true,
    get: function() {
        return AnimesLangIdEpisodeDownloadRoute;
    }
});
var _Route = require("../Route");
var _animesstore = require("../../store/animes.store");
var _child_process = require("child_process");
var _fs = /*#__PURE__*/ _interop_require_default(require("fs"));
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
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
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
var AnimesLangIdEpisodeDownloadRoute = /*#__PURE__*/ function(Route) {
    "use strict";
    _inherits(AnimesLangIdEpisodeDownloadRoute, Route);
    var _super = _create_super(AnimesLangIdEpisodeDownloadRoute);
    function AnimesLangIdEpisodeDownloadRoute() {
        _class_call_check(this, AnimesLangIdEpisodeDownloadRoute);
        var _this;
        _this = _super.apply(this, arguments);
        _define_property(_assert_this_initialized(_this), "url", "/animes/:lang/:id/:episodeNumber/download");
        _define_property(_assert_this_initialized(_this), "method", "GET");
        _define_property(_assert_this_initialized(_this), "handler", function() {
            var _ref = _async_to_generator(function(request, reply) {
                return _ts_generator(this, function(_state) {
                    return [
                        2,
                        new Promise(function() {
                            var _ref = _async_to_generator(function(resolve, reject) {
                                var _request_params, lang, id, episodeNumber, anime, episode, _ref, uri, subtitlesVtt, baseUrl, videoUrl, videoName, video;
                                return _ts_generator(this, function(_state) {
                                    switch(_state.label){
                                        case 0:
                                            _request_params = request.params, lang = _request_params.lang, id = _request_params.id, episodeNumber = _request_params.episodeNumber;
                                            /* These are validation checks being performed on the `lang`, `id`, and `episode` parameters
      received in the request. */ if (lang !== "vf" && lang !== "vostfr") return [
                                                2,
                                                resolve(reply.status(404).send({
                                                    error: "Anime with id ".concat(id, " not found.")
                                                }))
                                            ];
                                            if (isNaN(Number(id))) return [
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
                                            return [
                                                4,
                                                _animesstore.AnimeStore.get(id, lang)
                                            ];
                                        case 1:
                                            anime = _state.sent();
                                            /* These are error checks being performed on the `anime` object retrieved from the `AnimeStore`. */ if (!anime) return [
                                                2,
                                                resolve(reply.status(400).send({
                                                    error: "Anime with id ".concat(id, " not found.")
                                                }))
                                            ];
                                            if (anime.episodes.length < Number(episodeNumber)) return [
                                                2,
                                                resolve(reply.status(400).send({
                                                    error: "Anime with id ".concat(id, " has no episode ").concat(episodeNumber, ".")
                                                }))
                                            ];
                                            episode = anime.episodes[Number(episodeNumber) - 1];
                                            return [
                                                4,
                                                _animesstore.AnimeStore.getEpisodeVideo(episode)
                                            ];
                                        case 2:
                                            _ref = _state.sent(), uri = _ref.uri, subtitlesVtt = _ref.subtitlesVtt, baseUrl = _ref.baseUrl;
                                            videoUrl = "https://proxy.ketsuna.com/?url=" + encodeURIComponent(uri);
                                            videoName = new Date().getTime() + anime.title + " " + episodeNumber + ".mp4";
                                            video = (0, _child_process.spawn)('ffmpeg -y -i "'.concat(videoUrl, '" -protocol_whitelist https,tls,file,tcp -bsf:a aac_adtstoasc -vcodec copy "').concat(videoName, '"'), {
                                                shell: true
                                            });
                                            video.on("close", function(code) {
                                                console.log("child process exited with code ".concat(code));
                                                resolve(reply.send(_fs.default.createReadStream(videoName)).status(200).header("Content-Type", "video/mp4").header("Content-Disposition", 'attachment; filename="'.concat(videoName, '"')).header("Content-Length", _fs.default.statSync(videoName).size).header("Accept-Ranges", "bytes").header("Connection", "keep-alive"));
                                                _fs.default.unlinkSync(videoName);
                                            });
                                            return [
                                                2
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
    return AnimesLangIdEpisodeDownloadRoute;
}(_Route.Route);
