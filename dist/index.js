"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _GazeApi = require("./GazeApi");
var _Config = require("./Config");
var _Indexroute = require("./route/Index.route");
var _Animesroute = require("./route/animes/Animes.route");
var _AnimesLangroute = require("./route/animes/AnimesLang.route");
var _AnimesLangIdroute = require("./route/animes/AnimesLangId.route");
var _AnimesLangIdEpisoderoute = require("./route/animes/AnimesLangIdEpisode.route");
var _AnimesLangIdEpisodeDownloadroute = require("./route/animes/AnimesLangIdEpisodeDownload.route");
var _AnimesRssroute = require("./route/animes/AnimesRss.route");
require("reflect-metadata");
var _datasource = require("./data-source");
var gazeApi = new _GazeApi.GazeApi();
gazeApi.handleRoutes([
    _Indexroute.IndexRoute,
    _AnimesRssroute.AnimesRssRoute,
    _Animesroute.AnimesRoute,
    _AnimesLangroute.AnimesLangRoute,
    _AnimesLangIdroute.AnimesLangIdRoute,
    _AnimesLangIdEpisoderoute.AnimesLangIdEpisodeRoute,
    _AnimesLangIdEpisodeDownloadroute.AnimesLangIdEpisodeDownloadRoute
]);
// gazeApi.handleMiddleware([AuthMiddleware]);
gazeApi.fastify.addHook("onReady", function() {
    console.log("⚡ ready to use");
});
_datasource.AppDataSource.initialize().then(function() {
    console.log("\uD83D\uDDC3️  database initialized");
}).catch(function(error) {
    console.log("\uD83D\uDDC3️  database initialization failed");
    console.log(error);
});
gazeApi.start(_Config.Config.port);
