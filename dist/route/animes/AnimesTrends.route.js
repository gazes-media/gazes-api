"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true,
});
Object.defineProperty(exports, "AnimesTrends", {
    enumerable: true,
    get: function () {
        return AnimesTrends;
    },
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
var AnimesTrends = /*#__PURE__*/ (function (Route) {
    "use strict";
    _inherits(AnimesTrends, Route);
    var _super = _create_super(AnimesTrends);
    function AnimesTrends() {
        _class_call_check(this, AnimesTrends);
        var _this;
        _this = _super.apply(this, arguments);
        _define_property(_assert_this_initialized(_this), "url", "/animes/trends");
        _define_property(_assert_this_initialized(_this), "method", "GET");
        _define_property(_assert_this_initialized(_this), "handler", function (request, reply) {
            var animes = _animesstore.AnimeStore.vostfr;
            animes = animes.filter(function (a) {
                return a.status === "1";
            });
            animes = animes
                .sort(function (a, b) {
                    return parseInt(b.score) - parseInt(a.score);
                })
                .slice(0, animes.length / 2);
            animes = animes
                .sort(function (a, b) {
                    return parseInt(b.start_date_year) - parseInt(a.start_date_year);
                })
                .slice(0, animes.length / 2);
            return animes;
        });
        return _this;
    }
    return AnimesTrends;
})(_Route.Route);
