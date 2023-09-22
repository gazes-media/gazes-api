"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    IndexRoute: function() {
        return IndexRoute;
    },
    AnimesRssRoute: function() {
        return _AnimesRssroute.AnimesRssRoute;
    },
    AnimesRoute: function() {
        return _Animesroute.AnimesRoute;
    },
    AnimeHighlightedRoute: function() {
        return _AnimesHighlightedroute.AnimeHighlightedRoute;
    },
    AnimesSeasonsRoute: function() {
        return _AnimesSeasonsroute.AnimesSeasonsRoute;
    },
    AnimesIdRoute: function() {
        return _AnimesIdroute.AnimesIdRoute;
    },
    AnimesIdEpisodeRoute: function() {
        return _AnimesIdEpisoderoute.AnimesIdEpisodeRoute;
    },
    UserHistoryRoute: function() {
        return _Historyroute.UserHistoryRoute;
    },
    UserAnimesRoute: function() {
        return _Animeroute.UserAnimesRoute;
    },
    UserFavorisRoute: function() {
        return _Favorisroute.UserFavorisRoute;
    },
    UserFavorisPostRoute: function() {
        return _FavorisPostroute.UserFavorisPostRoute;
    },
    UserFavorisDeleteRoute: function() {
        return _FavorisDeleteroute.UserFavorisDeleteRoute;
    },
    UserAnimesDeleteRoute: function() {
        return _AnimeDeleteroute.UserAnimesDeleteRoute;
    },
    AnimesTrends: function() {
        return _AnimesTrendsroute.AnimesTrends;
    }
});
var _Route = require("./Route");
var _AnimesRssroute = require("./animes/AnimesRss.route");
var _Animesroute = require("./animes/Animes.route");
var _AnimesHighlightedroute = require("./animes/AnimesHighlighted.route");
var _AnimesSeasonsroute = require("./animes/AnimesSeasons.route");
var _AnimesIdroute = require("./animes/AnimesId.route");
var _AnimesIdEpisoderoute = require("./animes/AnimesIdEpisode.route");
var _Historyroute = require("./users/History.route");
var _Animeroute = require("./users/Anime.route");
var _Favorisroute = require("./users/Favoris.route");
var _FavorisPostroute = require("./users/FavorisPost.route");
var _FavorisDeleteroute = require("./users/FavorisDelete.route");
var _AnimeDeleteroute = require("./users/AnimeDelete.route");
var _AnimesTrendsroute = require("./animes/AnimesTrends.route");
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
var IndexRoute = /*#__PURE__*/ function(Route) {
    "use strict";
    _inherits(IndexRoute, Route);
    var _super = _create_super(IndexRoute);
    function IndexRoute() {
        _class_call_check(this, IndexRoute);
        var _this;
        _this = _super.apply(this, arguments);
        _define_property(_assert_this_initialized(_this), "url", "/");
        _define_property(_assert_this_initialized(_this), "method", "GET");
        _define_property(_assert_this_initialized(_this), "handler", function(request, reply) {
            reply.send({
                message: "testing"
            });
        });
        return _this;
    }
    return IndexRoute;
}(_Route.Route);
