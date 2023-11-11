"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true,
});
Object.defineProperty(exports, "Anime", {
    enumerable: true,
    get: function () {
        return Anime;
    },
});
require("reflect-metadata");
var _typeorm = require("typeorm");
var _User = require("./User");
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
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
var Anime = function Anime() {
    "use strict";
    _class_call_check(this, Anime);
    _define_property(this, "generatedId", void 0);
    _define_property(this, "id", void 0);
    _define_property(this, "user", void 0);
    _define_property(this, "episode", void 0);
    _define_property(this, "duration", void 0);
    _define_property(this, "time", void 0);
    _define_property(this, "date", void 0);
};
_ts_decorate([(0, _typeorm.PrimaryGeneratedColumn)(), _ts_metadata("design:type", Number)], Anime.prototype, "generatedId", void 0);
_ts_decorate([(0, _typeorm.Column)(), _ts_metadata("design:type", Number)], Anime.prototype, "id", void 0);
_ts_decorate(
    [
        (0, _typeorm.ManyToOne)(
            function () {
                return _User.User;
            },
            function (user) {
                return user.googleId;
            },
        ),
        _ts_metadata("design:type", typeof _User.User === "undefined" ? Object : _User.User),
    ],
    Anime.prototype,
    "user",
    void 0,
);
_ts_decorate([(0, _typeorm.Column)(), _ts_metadata("design:type", Number)], Anime.prototype, "episode", void 0);
_ts_decorate([(0, _typeorm.Column)(), _ts_metadata("design:type", Number)], Anime.prototype, "duration", void 0);
_ts_decorate([(0, _typeorm.Column)(), _ts_metadata("design:type", Number)], Anime.prototype, "time", void 0);
_ts_decorate([(0, _typeorm.Column)(), _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)], Anime.prototype, "date", void 0);
Anime = _ts_decorate([(0, _typeorm.Entity)()], Anime);
