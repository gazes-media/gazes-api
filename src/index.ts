import { GazeApi } from "./GazeApi";
import { Config } from "./Config";
import { IndexRoute } from "./route/Index.route";
import { AnimesRoute } from "./route/animes/Animes.route";
import { AnimesLangRoute } from "./route/animes/AnimesLang.route";
import { AnimesLangIdRoute } from "./route/animes/AnimesLangId.route";
import { AnimesLangIdEpisodeRoute } from "./route/animes/AnimesLangIdEpisode.route";
import { AnimesLangIdEpisodeDownloadRoute } from "./route/animes/AnimesLangIdEpisodeDownload.route";
import { AnimesRssRoute } from "./route/animes/AnimesRss.route";
import { AuthMiddleware } from "./middleware/Auth.middleware";
import 'reflect-metadata';
import { AppDataSource } from "./data-source";

const gazeApi = new GazeApi();

gazeApi.handleRoutes([IndexRoute, AnimesRssRoute, AnimesRoute, AnimesLangRoute, AnimesLangIdRoute, AnimesLangIdEpisodeRoute, AnimesLangIdEpisodeDownloadRoute]);
// gazeApi.handleMiddleware([AuthMiddleware]);

gazeApi.fastify.addHook("onReady", () => {
  console.log("⚡ ready to use");
});

AppDataSource.initialize()
    .then(() => {
        console.log("🗃️  database initialized");
    })
    .catch((error) => {
        console.log("🗃️  database initialization failed");
        console.log(error);
    });


gazeApi.start(Config.port);
