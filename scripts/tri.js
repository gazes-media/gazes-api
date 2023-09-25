"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _fs = /*#__PURE__*/ _interop_require_default(require("fs"));
var _nodefetch = /*#__PURE__*/ _interop_require_default(require("node-fetch"));
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
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
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
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
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
var animeType;
(function(animeType) {
    animeType[animeType["tv"] = 0] = "tv";
    animeType[animeType["m0v1e"] = 1] = "m0v1e";
    animeType[animeType["special"] = 2] = "special";
    animeType[animeType["ova"] = 3] = "ova";
    animeType[animeType[""] = 4] = "";
})(animeType || (animeType = {}));
function groupAnimeBySimilarName(animeList) {
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
            if (title_fa && title_fa.length < 2) return "continue";
            if (title_en && animeEnglish) {
                if (animeEnglish.startsWith(title_en)) {
                    groupedAnime[existingAnime].push(id);
                    matched = true;
                    return "break";
                } else if (animeRomanji && title_ro) {
                    if (animeRomanji.startsWith(title_ro)) {
                        groupedAnime[existingAnime].push(id);
                        matched = true;
                        return "break";
                    } else if (animeTitle && title_fa) {
                        if (animeTitle.startsWith(title_fa)) {
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
    console.log(result.length);
    _fs.default.writeFileSync("./saisons.json", JSON.stringify(result));
}
_async_to_generator(function() {
    var fetched, json;
    return _ts_generator(this, function(_state) {
        switch(_state.label){
            case 0:
                return [
                    4,
                    (0, _nodefetch.default)("https://api.gazes.fr/anime/animes")
                ];
            case 1:
                fetched = _state.sent();
                return [
                    4,
                    fetched.json()
                ];
            case 2:
                json = _state.sent();
                groupAnimeBySimilarName(json);
                return [
                    2
                ];
        }
    });
})();

