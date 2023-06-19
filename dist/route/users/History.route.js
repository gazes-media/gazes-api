"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UserHistoryRoute", {
    enumerable: true,
    get: function() {
        return UserHistoryRoute;
    }
});
var _Route = require("../Route");
var _datasource = require("../../data-source");
var _Anime = require("../../entity/Anime");
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
var UserHistoryRoute = /*#__PURE__*/ function(Route) {
    "use strict";
    _inherits(UserHistoryRoute, Route);
    var _super = _create_super(UserHistoryRoute);
    function UserHistoryRoute() {
        _class_call_check(this, UserHistoryRoute);
        var _this;
        _this = _super.apply(this, arguments);
        _define_property(_assert_this_initialized(_this), "url", "/users/history");
        _define_property(_assert_this_initialized(_this), "method", "GET");
        _define_property(_assert_this_initialized(_this), "handler", function(request, reply) {
            // get body from request
            var user = request.body.user;
            _datasource.AppDataSource.getRepository(_Anime.Anime).find({
                where: {
                    user: {
                        googleId: user.uid
                    }
                },
                order: {
                    date: "DESC"
                }
            }).then(function(u) {
                // Trie des épisodes par "animé" puis par "date de visionnage"
                if (!u) return reply.send({
                    success: true,
                    animes: []
                });
                var animes = [];
                u.forEach(function(a) {
                    var anime = animes.find(function(anime) {
                        return anime.id === a.id;
                    });
                    if (anime) {
                        anime.episodes.push(a);
                    } else {
                        animes.push({
                            id: a.id,
                            episodes: [
                                a
                            ]
                        });
                    }
                });
                animes.forEach(function(a) {
                    a.episodes.sort(function(a, b) {
                        return b.date.getTime() - a.date.getTime();
                    });
                });
                return reply.send({
                    success: true,
                    animes: animes
                });
            });
        });
        return _this;
    }
    return UserHistoryRoute;
}(_Route.Route);
