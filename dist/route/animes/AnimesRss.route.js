"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AnimesRssRoute", {
    enumerable: true,
    get: function() {
        return AnimesRssRoute;
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
var AnimesRssRoute = /*#__PURE__*/ function(Route) {
    "use strict";
    _inherits(AnimesRssRoute, Route);
    var _super = _create_super(AnimesRssRoute);
    function AnimesRssRoute() {
        _class_call_check(this, AnimesRssRoute);
        var _this;
        _this = _super.apply(this, arguments);
        _define_property(_assert_this_initialized(_this), "url", "/animes/rss");
        _define_property(_assert_this_initialized(_this), "method", "GET");
        _define_property(_assert_this_initialized(_this), "handler", function(request, reply) {
            var animesFiltered = _animesstore.AnimeStore.latest.map(function(anime) {
                var regex = /\/anime\/info\/(\d+)-[\w-]+/;
                var id = anime.anime_url.match(regex);
                return {
                    title: anime.title,
                    link: "https://gazes.fr/anime/".concat(id[1], "/episode/").concat(_animesstore.AnimeStore.episodeToNumber(anime.episode)),
                    description: "Episode ".concat(_animesstore.AnimeStore.episodeToNumber(anime.episode), " de ").concat(anime.title),
                    pubDate: new Date(anime.timestamp * 1000).toUTCString(),
                    image: anime.url_bg,
                    lang: anime.lang
                };
            });
            var rss = '<?xml version="1.0" encoding="UTF-8"?>\n            <rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:atom="http://www.w3.org/2005/Atom">\n        <channel>\n            <atom:link href="https://api.gazes.fr/anime/animes/rss" rel="self" type="application/rss+xml" />\n            <title>Gaze RSS Feed</title>\n            <link>https://gazes.fr/</link>\n            <description>Latest anime releases from Gazes</description>\n            <language>fr-fr</language>\n            <lastBuildDate>'.concat(new Date().toUTCString(), "</lastBuildDate>\n            <pubDate>").concat(new Date().toUTCString(), "</pubDate>\n            <ttl>60</ttl>\n            ").concat(animesFiltered.map(function(anime) {
                return "<item>\n                <guid>".concat(anime.link, "</guid>\n                <title>").concat(anime.title, "</title>\n                <link>").concat(anime.link, "</link>\n                <lang>").concat(anime.lang, "</lang>\n                <description>").concat(anime.description, "</description>\n                <pubDate>").concat(anime.pubDate, '</pubDate>\n                <media:thumbnail url="').concat(anime.image, '" width="300" height="300" xmlns:media="http://search.yahoo.com/mrss/" />\n            </item>\n');
            }).join(""), "\n        </channel>\n    </rss>\n        ");
            reply.header("Access-Control-Allow-Origin", "*");
            reply.header("Content-Type", "application/xml");
            reply.send(rss);
        });
        return _this;
    }
    return AnimesRssRoute;
}(_Route.Route);
