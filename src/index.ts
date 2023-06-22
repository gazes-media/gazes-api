import { GazeApi } from "./GazeApi";
import { Config } from "./Config";
import * as Router from "./route/Index.route";
import { AuthMiddleware } from "./middleware/Auth.middleware";
import 'reflect-metadata';
import { AppDataSource } from "./data-source";
import admin from 'firebase-admin';
const gazeApi = new GazeApi();
const RouterIndex = Object.values(Router);

gazeApi.handleRoutes(RouterIndex);
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

admin.initializeApp({
    credential: admin.credential.cert("./animaflix-53e15-firebase-adminsdk-xvjq7-2c13172613.json"),
    databaseURL: "https://animaflix-53e15-default-rtdb.europe-west1.firebasedatabase.app"
});



gazeApi.start(Config.port);
