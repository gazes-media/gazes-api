"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AnimesRoute", {
    enumerable: true,
    get: function() {
        return AnimesRoute;
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
var AnimesRoute = /*#__PURE__*/ function(Route) {
    "use strict";
    _inherits(AnimesRoute, Route);
    var _super = _create_super(AnimesRoute);
    function AnimesRoute() {
        _class_call_check(this, AnimesRoute);
        var _this;
        _this = _super.apply(this, arguments);
        _define_property(_assert_this_initialized(_this), "url", "/animes");
        _define_property(_assert_this_initialized(_this), "method", "GET");
        _define_property(_assert_this_initialized(_this), "handler", function(request, reply) {
            var _request_query = request.query, type = _request_query.type, lang = _request_query.lang, status = _request_query.status, genres = _request_query.genres, year = _request_query.year, title = _request_query.title;
            var typeSeparated = [], genresSeparated = [], AnimeList = [], yearSeparated = [], filterUsed = false;
            if (type) {
                filterUsed = true;
                // type are separated by a comma in the url
                typeSeparated = type.split(",");
                // do a loop on the type to get the animes of each type
                typeSeparated.forEach(function(type) {
                    AnimeList = AnimeList.concat(_animesstore.AnimeStore.all.filter(function(anime) {
                        return anime.type === type;
                    }));
                });
            }
            if (genres) {
                filterUsed = true;
                // genres are separated by a comma in the url
                genresSeparated = genres.split(",");
                // verify if the animelist is empty or not
                if (AnimeList.length === 0) {
                    AnimeList = _animesstore.AnimeStore.all;
                }
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    // be sure ALL genres are present in the anime
                    for(var _iterator = genresSeparated[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        genres = _step.value;
                        AnimeList = AnimeList.filter(function(anime) {
                            return anime.genres.includes(genres);
                        });
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
            // verify if other types are specified
            if (year) {
                filterUsed = true;
                yearSeparated = year.split(",");
                if (AnimeList.length === 0) {
                    yearSeparated.forEach(function(year) {
                        AnimeList = AnimeList.concat(_animesstore.AnimeStore.all.filter(function(anime) {
                            return anime.start_date_year == year;
                        }));
                    });
                } else {
                    yearSeparated.forEach(function(year) {
                        AnimeList = AnimeList.filter(function(anime) {
                            return anime.start_date_year == year;
                        });
                    });
                }
            }
            if (title) {
                filterUsed = true;
                if (AnimeList.length === 0) {
                    AnimeList = _animesstore.AnimeStore.all;
                }
                // lookup for the title in the animeList
                AnimeList = AnimeList.filter(function(anime) {
                    var found = false;
                    if (anime.title) {
                        found = anime.title.toLowerCase().includes(title.toLowerCase());
                    }
                    if (anime.title_english) {
                        if (found) return found;
                        found = anime.title_english.toLowerCase().includes(title.toLowerCase());
                    }
                    if (anime.title_romanji) {
                        if (found) return found;
                        found = anime.title_romanji.toLowerCase().includes(title.toLowerCase());
                    }
                    if (anime.others) {
                        if (found) return found;
                        found = anime.others.toLowerCase().includes(title.toLowerCase());
                    }
                    // if not found return false
                    return found;
                });
            }
            if (status) {
                filterUsed = true;
                // status are separated by a comma in the url
                if (AnimeList.length === 0) {
                    AnimeList = _animesstore.AnimeStore.all;
                }
                AnimeList = AnimeList.filter(function(anime) {
                    return anime.status === status;
                });
            }
            if (lang) {
                filterUsed = true;
                // verify if the animelist is empty or not
                if (AnimeList.length === 0) {
                    // if empty we do a regular filter on the AnimeStore.all
                    if (lang == "vf") {
                        reply.send({
                            vf: _animesstore.AnimeStore.vf
                        });
                    } else {
                        reply.send({
                            vostfr: _animesstore.AnimeStore.vostfr
                        });
                    }
                } else {
                    if (lang == "vf") {
                        reply.send({
                            vf: AnimeList.filter(function(anime) {
                                return anime.lang === "vf";
                            })
                        });
                    } else {
                        reply.send({
                            vostfr: AnimeList.filter(function(anime) {
                                return anime.lang === "vostfr";
                            })
                        });
                    }
                }
            }
            if (filterUsed) {
                if (AnimeList.length === 0) {
                    reply.send({
                        vf: [],
                        vostfr: []
                    });
                } else {
                    reply.send({
                        vf: AnimeList.filter(function(anime) {
                            return anime.lang === "vf";
                        }),
                        vostfr: AnimeList.filter(function(anime) {
                            return anime.lang === "vostfr";
                        })
                    });
                }
            } else {
                reply.send({
                    vf: _animesstore.AnimeStore.vf,
                    vostfr: _animesstore.AnimeStore.vostfr
                });
            }
        });
        return _this;
    }
    return AnimesRoute;
}(_Route.Route);
