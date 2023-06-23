"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UserFavorisRoute", {
    enumerable: true,
    get: function() {
        return UserFavorisRoute;
    }
});
var _Route = require("../Route");
var _datasource = require("../../data-source");
var _User = require("../../entity/User");
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
var UserFavorisRoute = /*#__PURE__*/ function(Route) {
    "use strict";
    _inherits(UserFavorisRoute, Route);
    var _super = _create_super(UserFavorisRoute);
    function UserFavorisRoute() {
        _class_call_check(this, UserFavorisRoute);
        var _this;
        _this = _super.apply(this, arguments);
        _define_property(_assert_this_initialized(_this), "url", "/users/favoris");
        _define_property(_assert_this_initialized(_this), "method", "GET");
        _define_property(_assert_this_initialized(_this), "handler", function(request, reply) {
            // get body from request
            var user = request.body.user;
            _datasource.AppDataSource.getRepository(_User.Favoris).find({
                where: {
                    user: {
                        googleId: user.uid
                    }
                }
            }).then(function(u) {
                // Trie des épisodes par "animé" puis par "date de visionnage"
                if (!u) return reply.send({
                    success: true,
                    animes: []
                });
                var animes = {
                    vf: [],
                    vostfr: []
                };
                u.forEach(function(a) {
                    var anime = _animesstore.AnimeStore.vostfr.find(function(anime) {
                        return anime.id === a.animeId;
                    });
                    if (anime) {
                        animes.vostfr.push(anime);
                        var animeVf = _animesstore.AnimeStore.vf.find(function(animeVf) {
                            return animeVf.id === a.animeId;
                        });
                        if (animeVf) {
                            animes.vf.push(animeVf);
                        }
                    }
                });
                return reply.send({
                    success: true,
                    animes: animes
                });
            }).catch(function(error) {
                return reply.send({
                    success: false,
                    error: error
                });
            });
        });
        return _this;
    }
    return UserFavorisRoute;
}(_Route.Route);
