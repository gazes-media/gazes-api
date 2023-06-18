import { GazeApi } from "./GazeApi";
import { Config } from "./Config";
import * as Router from "./route/Index.route";
import { AuthMiddleware } from "./middleware/Auth.middleware";
import 'reflect-metadata';
import { AppDataSource } from "./data-source";

const gazeApi = new GazeApi();
const RouterIndex = Object.values(Router);

gazeApi.handleRoutes(RouterIndex);
gazeApi.handleMiddleware([AuthMiddleware]);

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
