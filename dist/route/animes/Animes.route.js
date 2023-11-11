"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true,
});
Object.defineProperty(exports, "AnimesRoute", {
    enumerable: true,
    get: function () {
        return AnimesRoute;
    },
});
var _Route = require("../Route");
var _animesstore = require("../../store/animes.store");
var _fuse = /*#__PURE__*/ _interop_require_default(require("fuse.js"));
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
            writable: true,
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _get_prototype_of(o) {
    _get_prototype_of = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function getPrototypeOf(o) {
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
            configurable: true,
        },
    });
    if (superClass) _set_prototype_of(subClass, superClass);
}
function _interop_require_default(obj) {
    return obj && obj.__esModule
        ? obj
        : {
              default: obj,
          };
}
function _possible_constructor_return(self, call) {
    if (call && (_type_of(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assert_this_initialized(self);
}
function _set_prototype_of(o, p) {
    _set_prototype_of =
        Object.setPrototypeOf ||
        function setPrototypeOf(o, p) {
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
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _create_super(Derived) {
    var hasNativeReflectConstruct = _is_native_reflect_construct();
    return function _createSuperInternal() {
        var Super = _get_prototype_of(Derived),
            result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _get_prototype_of(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possible_constructor_return(this, result);
    };
}
var AnimesRoute = /*#__PURE__*/ (function (Route) {
    "use strict";
    _inherits(AnimesRoute, Route);
    var _super = _create_super(AnimesRoute);
    function AnimesRoute() {
        _class_call_check(this, AnimesRoute);
        var _this;
        _this = _super.apply(this, arguments);
        _define_property(_assert_this_initialized(_this), "url", "/animes");
        _define_property(_assert_this_initialized(_this), "method", "GET");
        _define_property(_assert_this_initialized(_this), "handler", function (request, reply) {
            // récupérer les possible queries
            var _request_query = request.query,
                types = _request_query.types,
                status = _request_query.status,
                genres = _request_query.genres,
                year = _request_query.year,
                title = _request_query.title;
            var animes = _animesstore.AnimeStore.vostfr;
            /**
             * The function filters an array of anime objects based on various criteria such as type, language,
             * status, genres, and years.
             */ function animesFilter(a) {
                var toreturn = true;
                if (types && !types.split(",").includes(a.type.toString())) toreturn = false;
                if (status && a.status !== status) toreturn = false;
                if (genres) {
                    genres
                        .split(",")
                        .filter(function (a) {
                            return a.startsWith("!");
                        })
                        .map(function (a) {
                            return a.replace("!", "");
                        })
                        .forEach(function (negativeGenre) {
                            if (a.genres.includes(negativeGenre)) toreturn = false;
                        });
                    genres
                        .split(",")
                        .filter(function (a) {
                            return !a.startsWith("!");
                        })
                        .forEach(function (positiveGenre) {
                            if (!a.genres.includes(positiveGenre)) toreturn = false;
                        });
                }
                if (year && !year.includes(a.start_date_year)) toreturn = false;
                return toreturn;
            }
            animes = animes.filter(animesFilter);
            /**
             * The function `titleFilter` takes an `Anime` object and a `title` string as input, and returns
             * `true` if any of the titles in the `Anime` object (including English, French, Romanji, and
             * others) contain the `title` string (case-insensitive), otherwise it returns `false`.
             */ if (title) {
                var fuse = new _fuse.default(animes, {
                    keys: ["title", "title_english", "title_romanji", "title_french"],
                    includeScore: false,
                });
                animes = fuse.search(title).map(function (a) {
                    return a.item;
                });
            }
            if (animes.length <= 0) {
                console.log(animes);
                return reply.status(404).send({
                    success: false,
                    message: "La requ\xeate a \xe9t\xe9 trait\xe9e avec succ\xe8s, mais aucun contenu n'est disponible pour la r\xe9ponse demand\xe9e.",
                });
            }
            return reply.send({
                success: true,
                data: animes,
            });
        });
        return _this;
    }
    return AnimesRoute;
})(_Route.Route);
