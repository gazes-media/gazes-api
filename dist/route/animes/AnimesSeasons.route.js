"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AnimesSeasonsRoute", {
    enumerable: true,
    get: function() {
        return AnimesSeasonsRoute;
    }
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
var AnimesSeasonsRoute = /*#__PURE__*/ function(Route) {
    "use strict";
    _inherits(AnimesSeasonsRoute, Route);
    var _super = _create_super(AnimesSeasonsRoute);
    function AnimesSeasonsRoute() {
        _class_call_check(this, AnimesSeasonsRoute);
        var _this;
        _this = _super.apply(this, arguments);
        _define_property(_assert_this_initialized(_this), "url", "/animes/seasons");
        _define_property(_assert_this_initialized(_this), "method", "GET");
        _define_property(_assert_this_initialized(_this), "handler", function(request, reply) {
            // récupérer les possible queries
            var _request_query = request.query, title = _request_query.title, id = _request_query.id;
            var seasons = _animesstore.AnimeStore.seasons;
            if (seasons.length <= 0) {
                _animesstore.AnimeStore.groupAnimeBySimilarName(_animesstore.AnimeStore.vostfr);
                seasons = _animesstore.AnimeStore.seasons;
            }
            if (title) {
                var fuse = new _fuse.default(seasons, {
                    keys: [
                        "title",
                        "title_english",
                        "title_romanji",
                        "others"
                    ],
                    includeScore: false
                });
                seasons = fuse.search(title).map(function(a) {
                    return a.item;
                });
            }
            if (id) {
                seasons = seasons.filter(function(a) {
                    return a.ids.includes(parseInt(id));
                });
            }
            if (seasons.length <= 0) {
                return reply.status(404).send({
                    success: false,
                    message: "La requ\xeate a \xe9t\xe9 trait\xe9e avec succ\xe8s, mais aucun contenu n'est disponible pour la r\xe9ponse demand\xe9e."
                });
            }
            return reply.send({
                success: true,
                data: seasons
            });
        });
        return _this;
    }
    return AnimesSeasonsRoute;
}(_Route.Route);
