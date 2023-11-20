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
    Favoris: function() {
        return Favoris;
    },
    User: function() {
        return User;
    }
});
require("reflect-metadata");
var _typeorm = require("typeorm");
var _Anime = require("./Anime");
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
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
var User = function User() {
    "use strict";
    _class_call_check(this, User);
    _define_property(this, "id", void 0);
    _define_property(this, "googleId", void 0);
    _define_property(this, "history", void 0);
    _define_property(this, "favoris", void 0);
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], User.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], User.prototype, "googleId", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(function() {
        return _Anime.Anime;
    }, function(anime) {
        return anime.generatedId;
    }),
    _ts_metadata("design:type", Array)
], User.prototype, "history", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(function() {
        return Favoris;
    }, function(favoris) {
        return favoris.id;
    }),
    _ts_metadata("design:type", Array)
], User.prototype, "favoris", void 0);
User = _ts_decorate([
    (0, _typeorm.Entity)()
], User);
var Favoris = function Favoris() {
    "use strict";
    _class_call_check(this, Favoris);
    _define_property(this, "id", void 0);
    _define_property(this, "user", void 0);
    _define_property(this, "animeId", void 0);
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], Favoris.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(function() {
        return User;
    }, function(user) {
        return user.googleId;
    }),
    _ts_metadata("design:type", typeof User === "undefined" ? Object : User)
], Favoris.prototype, "user", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", Number)
], Favoris.prototype, "animeId", void 0);
Favoris = _ts_decorate([
    (0, _typeorm.Entity)()
], Favoris);
