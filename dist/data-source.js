"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppDataSource", {
    enumerable: true,
    get: function() {
        return AppDataSource;
    }
});
require("reflect-metadata");
var _typeorm = require("typeorm");
var _User = require("./entity/User");
var AppDataSource = new _typeorm.DataSource({
    type: "mariadb",
    host: "149.91.80.94",
    port: 3306,
    username: "gaze",
    password: "FK3sPh8BBHcCRp2T",
    database: "gaze",
    synchronize: true,
    logging: false,
    entities: [
        _User.User
    ],
    migrations: [],
    subscribers: []
});
