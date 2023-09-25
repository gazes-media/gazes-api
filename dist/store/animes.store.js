"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AnimeStore", {
    enumerable: true,
    get: function() {
        return AnimeStore;
    }
});
var _axios = /*#__PURE__*/ _interop_require_default(require("axios"));
var _cheerio = require("cheerio");
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
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
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
var vostfrUrl = "https://neko.ketsuna.com/animes-search-vostfr.json";
var vfUrl = "https://neko.ketsuna.com/animes-search-vf.json";
var AnimeStore = /*#__PURE__*/ function() {
    "use strict";
    function AnimeStore() {
        _class_call_check(this, AnimeStore);
    }
    _create_class(AnimeStore, null, [
        {
            key: "fetchAll",
            value: /* The function fetches data from two different URLs and 
  combines them into one array with a language property added to 
  each object.*/ function fetchAll() {
                var _this = this;
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    _axios.default.get(vostfrUrl)
                                ];
                            case 1:
                                _this.vostfr = _state.sent().data;
                                return [
                                    4,
                                    _axios.default.get(vfUrl)
                                ];
                            case 2:
                                _this.vf = _state.sent().data;
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "buildRegex",
            value: function buildRegex(title) {
                return new RegExp("^\\b".concat(title.replace("[", "").replace("]", ""), "\\b"), "i");
            }
        },
        {
            key: "groupAnimeBySimilarName",
            value: function groupAnimeBySimilarName(animeList) {
                var _this = this;
                var groupedAnime = {};
                animeList = animeList.sort(function(a, b) {
                    return a.id - b.id;
                });
                animeList.forEach(function(anime) {
                    var _loop = function(existingAnime) {
                        var currentId = parseInt(existingAnime.split("-")[0]);
                        var animeToCheck = animeList.find(function(e) {
                            return e.id === currentId;
                        });
                        var title_en = animeToCheck === null || animeToCheck === void 0 ? void 0 : animeToCheck.title_english, title_ro = animeToCheck === null || animeToCheck === void 0 ? void 0 : animeToCheck.title_romanji, title_fa = animeToCheck === null || animeToCheck === void 0 ? void 0 : animeToCheck.title;
                        if (title_en && animeEnglish) {
                            var regex = _this.buildRegex(title_en) // Recherche correspondance avec des mots complets, insensible à la casse
                            ;
                            if (regex.test(animeEnglish)) {
                                groupedAnime[existingAnime].push(id);
                                matched = true;
                                return "break";
                            } else if (animeRomanji && title_ro) {
                                var regex1 = _this.buildRegex(title_ro) // Recherche correspondance avec des mots complets, insensible à la casse
                                ;
                                if (regex1.test(animeRomanji)) {
                                    groupedAnime[existingAnime].push(id);
                                    matched = true;
                                    return "break";
                                } else if (animeTitle && title_fa) {
                                    var regex2 = _this.buildRegex(title_fa) // Recherche correspondance avec des mots complets, insensible à la casse
                                    ;
                                    if (regex2.test(animeTitle)) {
                                        groupedAnime[existingAnime].push(id);
                                        matched = true;
                                        return "break";
                                    }
                                }
                            }
                        }
                    };
                    var animeTitle = anime.title ? anime.title.trim() : false;
                    var animeEnglish = anime.title_english ? anime.title_english.trim() : false;
                    var animeRomanji = anime.title_romanji ? anime.title_romanji.trim() : false;
                    var id = anime.id;
                    var matched = false;
                    for(var existingAnime in groupedAnime){
                        var _ret = _loop(existingAnime);
                        if (_ret === "break") break;
                    }
                    if (!matched) {
                        groupedAnime[id.toString() + "-anime"] = [
                            id
                        ];
                    }
                });
                var result = Object.keys(groupedAnime).map(function(animeName) {
                    var animeFind = animeList.find(function(anime) {
                        return anime.id === groupedAnime[animeName][0];
                    });
                    if (!animeFind) return;
                    return {
                        title: animeFind.title,
                        ids: groupedAnime[animeName],
                        title_english: animeFind.title_english,
                        cover_url: animeFind.url_image,
                        others: animeFind.others,
                        genres: animeFind.genres,
                        title_romanji: animeFind.title_romanji,
                        seasons: groupedAnime[animeName].map(function(id) {
                            return {
                                year: parseInt(animeList.find(function(anime) {
                                    return anime.id === id;
                                }).start_date_year),
                                fiche: animeList.find(function(anime) {
                                    return anime.id === id;
                                })
                            };
                        }).sort(function(a, b) {
                            return a.year - b.year;
                        })
                    };
                });
                this.seasons = result;
            }
        },
        {
            key: "fetchLatest",
            value: /* This function fetches the latest episodes from a website 
  and stores them in an array. */ function fetchLatest() {
                var _this = this;
                return _async_to_generator(function() {
                    var data, parsedData, latestEpisodes;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    _axios.default.get("https://neko.ketsuna.com")
                                ];
                            case 1:
                                data = _state.sent().data;
                                parsedData = /var lastEpisodes = (.+)\;/gm.exec(data);
                                latestEpisodes = [];
                                if (parsedData) latestEpisodes = JSON.parse(parsedData[1]);
                                _this.latest = latestEpisodes;
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "episodeToNumber",
            value: /* This function converts a string representing an episode
  number to a number data type in TypeScript. */ function episodeToNumber(episode) {
                return Number(episode.replace("Ep. ", ""));
            }
        },
        {
            key: "get",
            value: /* This function retrieves information about an anime based on 
  its ID and language, including its synopsis, cover image URL, 
  and episodes. */ function get(id, lang) {
                var _this = this;
                return _async_to_generator(function() {
                    var _exec, _exec1, _exec2, anime, _ref, animeHtml, synopsis, coverUrl, episodes;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                anime = _this[lang].find(function(anime) {
                                    return anime.id.toString() == id;
                                });
                                if (!anime) return [
                                    2,
                                    Promise.resolve(undefined)
                                ];
                                return [
                                    4,
                                    _axios.default.get("https://neko.ketsuna.com/".concat(anime.url))
                                ];
                            case 1:
                                _ref = _state.sent(), animeHtml = _ref.data;
                                synopsis = (_exec = /(<div class="synopsis">\n<p>\n)(.*)/gm.exec(animeHtml)) === null || _exec === void 0 ? void 0 : _exec[2];
                                coverUrl = (_exec1 = /(<div id="head" style="background-image: url\()(.*)(\);)/gm.exec(animeHtml)) === null || _exec1 === void 0 ? void 0 : _exec1[2];
                                episodes = JSON.parse((_exec2 = /var episodes = (.+)\;/gm.exec(animeHtml)) === null || _exec2 === void 0 ? void 0 : _exec2[1]);
                                return [
                                    2,
                                    _object_spread_props(_object_spread({}, anime), {
                                        synopsis: synopsis,
                                        coverUrl: coverUrl,
                                        episodes: episodes
                                    })
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "getEpisodeVideo",
            value: /* This function retrieves the video URL and subtitle data for a given episode URL. */ function getEpisodeVideo(episode) {
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            new Promise(function() {
                                var _ref = _async_to_generator(function(resolve) {
                                    var _exec, episodeUrl, _ref, nekoData, pstreamUrl, _ref1, pstreamData, baseurl, loadedHTML, scripts, scriptsSrc, m3u8Url, subtitlesvtt, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, scriptSrc, _exec1, _ref2, pstreamScript, m3u8UrlB64, b64, pstream, _exec2, b641, pstream1, _exec3, b642, pstream2, err;
                                    return _ts_generator(this, function(_state) {
                                        switch(_state.label){
                                            case 0:
                                                episodeUrl = "https://neko.ketsuna.com" + episode.url;
                                                return [
                                                    4,
                                                    _axios.default.get(episodeUrl)
                                                ];
                                            case 1:
                                                _ref = _state.sent(), nekoData = _ref.data;
                                                pstreamUrl = (_exec = /(\n(.*)video\[0] = ')(.*)(';)/gm.exec(nekoData)) === null || _exec === void 0 ? void 0 : _exec[3];
                                                if (!pstreamUrl) return [
                                                    2,
                                                    resolve(undefined)
                                                ];
                                                return [
                                                    4,
                                                    _axios.default.get("https://proxy.ketsuna.com/?url=".concat(encodeURIComponent(pstreamUrl)))
                                                ];
                                            case 2:
                                                _ref1 = _state.sent(), pstreamData = _ref1.data;
                                                baseurl = pstreamUrl.split("/").slice(0, 3).join("/");
                                                loadedHTML = (0, _cheerio.load)(pstreamData);
                                                scripts = loadedHTML("script");
                                                scriptsSrc = scripts.map(function(i, el) {
                                                    return loadedHTML(el).attr("src");
                                                }).get();
                                                m3u8Url = "", subtitlesvtt = [];
                                                _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                                                _state.label = 3;
                                            case 3:
                                                _state.trys.push([
                                                    3,
                                                    8,
                                                    9,
                                                    10
                                                ]);
                                                _iterator = scriptsSrc[Symbol.iterator]();
                                                _state.label = 4;
                                            case 4:
                                                if (!!(_iteratorNormalCompletion = (_step = _iterator.next()).done)) return [
                                                    3,
                                                    7
                                                ];
                                                scriptSrc = _step.value;
                                                if (scriptSrc.includes("cloudflare-static")) return [
                                                    3,
                                                    6
                                                ];
                                                return [
                                                    4,
                                                    _axios.default.get("https://proxy.ketsuna.com/?url=".concat(encodeURIComponent(scriptSrc)))
                                                ];
                                            case 5:
                                                _ref2 = _state.sent(), pstreamScript = _ref2.data;
                                                m3u8UrlB64 = (_exec1 = /e.parseJSON\(atob\(t\).slice\(2\)\)\}\(\"([^;]*)"\),/gm.exec(pstreamScript)) === null || _exec1 === void 0 ? void 0 : _exec1[1];
                                                if (m3u8UrlB64) {
                                                    b64 = JSON.parse(atob(m3u8UrlB64).slice(2));
                                                    pstream = b64;
                                                    m3u8Url = Object.values(pstream).find(function(data) {
                                                        return typeof data === "string" && data.includes(".m3u8");
                                                    });
                                                    subtitlesvtt = pstream.subtitlesvtt;
                                                    return [
                                                        3,
                                                        7
                                                    ];
                                                } else {
                                                    ;
                                                    m3u8UrlB64 = (_exec2 = /e.parseJSON\(n\)}\(\"([^;]*)"\),/gm.exec(pstreamScript)) === null || _exec2 === void 0 ? void 0 : _exec2[1];
                                                    if (m3u8UrlB64) {
                                                        b641 = JSON.parse(atob(m3u8UrlB64).slice(2));
                                                        pstream1 = b641;
                                                        m3u8Url = Object.values(pstream1).find(function(data) {
                                                            return typeof data === "string" && data.includes(".m3u8");
                                                        });
                                                        subtitlesvtt = pstream1.subtitlesvtt;
                                                        return [
                                                            3,
                                                            7
                                                        ];
                                                    } else {
                                                        ;
                                                        m3u8UrlB64 = (_exec3 = /n=atob\("([^"]+)"/gm.exec(pstreamScript)) === null || _exec3 === void 0 ? void 0 : _exec3[1];
                                                        if (m3u8UrlB64) {
                                                            b642 = JSON.parse(atob(m3u8UrlB64).replace(/\|\|\|/, "").slice(29));
                                                            pstream2 = b642;
                                                            m3u8Url = Object.values(pstream2).find(function(data) {
                                                                return typeof data === "string" && data.includes(".m3u8");
                                                            });
                                                            subtitlesvtt = pstream2.subtitlesvtt;
                                                            return [
                                                                3,
                                                                7
                                                            ];
                                                        }
                                                    }
                                                }
                                                _state.label = 6;
                                            case 6:
                                                _iteratorNormalCompletion = true;
                                                return [
                                                    3,
                                                    4
                                                ];
                                            case 7:
                                                return [
                                                    3,
                                                    10
                                                ];
                                            case 8:
                                                err = _state.sent();
                                                _didIteratorError = true;
                                                _iteratorError = err;
                                                return [
                                                    3,
                                                    10
                                                ];
                                            case 9:
                                                try {
                                                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                                                        _iterator.return();
                                                    }
                                                } finally{
                                                    if (_didIteratorError) {
                                                        throw _iteratorError;
                                                    }
                                                }
                                                return [
                                                    7
                                                ];
                                            case 10:
                                                if (m3u8Url !== "") {
                                                    resolve({
                                                        uri: m3u8Url,
                                                        subtitlesVtt: subtitlesvtt,
                                                        baseUrl: baseurl
                                                    });
                                                } else {
                                                    resolve(undefined);
                                                }
                                                return [
                                                    2
                                                ];
                                        }
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
    return AnimeStore;
}();
_define_property(AnimeStore, "all", []);
_define_property(AnimeStore, "seasons", []);
_define_property(AnimeStore, "vostfr", []);
_define_property(AnimeStore, "vf", []);
_define_property(AnimeStore, "latest", []);
