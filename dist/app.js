"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const fastify_1 = __importDefault(require("fastify"));
const glob_1 = require("glob");
const app_1 = require("firebase-admin/app");
const animes_store_1 = require("./store/animes.store");
const multipart_1 = __importDefault(require("@fastify/multipart"));
/* The App class initializes a server, handles routes and middleware, starts and stops the server, and
toggles a smart cache feature for Animes. */
class App {
    constructor() {
        this.server = (0, fastify_1.default)({ logger: true });
    }
    /**
     * This function handles routes by importing all files with the pattern "*.route.*" and logging
     * their paths.
     */
    handleRoutes() {
        return __awaiter(this, void 0, void 0, function* () {
            let routes = yield (0, glob_1.glob)('**/*.route.{js,ts}');
            routes.forEach((routePath) => {
                console.log(routePath);
                Promise.resolve(`${__dirname + '/' + routePath.replace("dist\\", "").replace("src\\", "")}`).then(s => __importStar(require(s))).then((route) => {
                    console.log(route + " imported");
                }).catch((err) => {
                    console.log(err);
                });
            });
        });
    }
    /**
     * This function imports all middleware files in the project.
     */
    handleMiddlewares() {
        return __awaiter(this, void 0, void 0, function* () {
            let middlewares = yield (0, glob_1.glob)('**/*.middleware.{js,ts}');
            middlewares.forEach((MiddlewarePath) => {
                Promise.resolve(`${MiddlewarePath.replace('src', '.')}`).then(s => __importStar(require(s)));
            });
        });
    }
    /**
     * This function adds a route to a server using a specified path and callback function.
     */
    addRoute(path, cb) {
        this.server.get(path, cb);
    }
    /**
     * This function adds middleware to a server using a specified type and callback function.
     * @param {any} type - The type parameter is the type of middleware hook to be added. It could be
     * "preHandler", "onRequest", "onResponse", "onSend", or "onError".
     * @param {any} cb - cb stands for "callback" and is a function that will be executed when the
     * middleware is called. It takes in three parameters: request, response, and next. The request
     * parameter represents the incoming HTTP request, the response parameter represents the outgoing
     * HTTP response, and the next parameter is a function that is
     */
    addMiddleware(type, cb) {
        this.server.addHook(type, cb);
    }
    /**
     * This function starts a server on a specified port and initializes a Firebase app with a service
     * account.
     * @param {number} port - The port number on which the server will listen for incoming requests.
     */
    start(port) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const serviceAccount = require('./animaflix-53e15-firebase-adminsdk-xvjq7-2c13172613.json');
                (0, app_1.initializeApp)({
                    credential: (0, app_1.cert)(serviceAccount),
                    databaseURL: 'https://animaflix-53e15-default-rtdb.europe-west1.firebasedatabase.app/',
                });
                this.server.register(multipart_1.default);
                yield this.toggleSmartCache();
                yield this.handleMiddlewares();
                yield this.handleRoutes();
                yield this.server.listen({ port });
                console.log(`⚡ server running on port ${port}`);
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    /**
     * This function stops a server and logs a message indicating that the server has been stopped.
     */
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.server.close();
                console.log('server stopped');
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    /**
     * This function toggles a smart cache for Animes and refreshes it every 10 minutes.
     */
    toggleSmartCache() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                if (!animes_store_1.Animes.all[0]) {
                    yield animes_store_1.Animes.fetch();
                    yield animes_store_1.Animes.getLatestEpisodes();
                    console.log(`${animes_store_1.Animes.all.length} animes loaded (vf+vostfr)`);
                    resolve(null);
                }
                setInterval(() => {
                    animes_store_1.Animes.fetch();
                    animes_store_1.Animes.getLatestEpisodes();
                    console.log('♻️ cache refreshed');
                }, 600000);
            }));
        });
    }
}
exports.App = App;
