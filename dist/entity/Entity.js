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
    Anime: function() {
        return _Anime.Anime;
    },
    User: function() {
        return _User.User;
    },
    Favoris: function() {
        return _User.Favoris;
    }
});
var _Anime = require("./Anime");
var _User = require("./User");
