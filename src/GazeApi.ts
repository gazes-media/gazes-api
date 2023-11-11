import fastify, { FastifyInstance, RouteOptions } from "fastify";
import { Route } from "./route/Route";
import { Middleware } from "./middleware/Middleware";
import * as admin from "firebase-admin";
import { cert } from "firebase-admin/app";
import fastifyMultipart from "@fastify/multipart";
import { AnimeStore } from "./store/animes.store";
import cors from "@fastify/cors";

export class GazeApi {
  public fastify: FastifyInstance;

  constructor() {
    this.fastify = fastify();
    this.fastify.register(cors, {
      allowedHeaders: "*",
    });
  }

  public handleRoutes(routes: (new () => Route)[]) {
    for (const route of routes) {
      const options: RouteOptions = new route();
      this.fastify.route(options);
    }
  }

  /* This function adds middleware hooks to a Fastify server instance. */
  public handleMiddleware(middlewares: (new () => Middleware)[]) {
    for (const middleware of middlewares) {
      this.fastify.addHook("preValidation", new middleware().handle);
    }
  }

  /* This function starts a server on a specified port and initializes a Firebase admin instance. */
  public async start(port: number) {
    await this.toggleSmartCache();
    await this.fastify.register(fastifyMultipart);

    this.fastify.listen({ host: "localhost", port }, (err, adress) => {
      if (err) {
        console.error(err);
        return;
      }

      const serviceAccount = require("../animaflix-53e15-firebase-adminsdk-xvjq7-2c13172613.json");
      admin.initializeApp({ credential: cert(serviceAccount), databaseURL: "https://animaflix-53e15-default-rtdb.europe-west1.firebasedatabase.app/" }, "animaflix");
     
      console.log(`Server is starting on ${adress}`);
    });
  }

  /* This function toggles a smart cache by fetching and getting the latest episodes 
  of animes, and refreshing the cache every 10 minutes. */
  private async toggleSmartCache() {
    return new Promise(async (resolve) => {
      if (!AnimeStore.all[0]) {
        AnimeStore.fetchAll();
        AnimeStore.fetchLatest();
        console.log(`${AnimeStore.all.length} animes loaded (vf+vostfr)`);
        resolve(null);
      }

      setInterval(() => {
        AnimeStore.fetchAll();
        AnimeStore.fetchLatest();
        console.log("♻️ cache refreshed");
      }, 600000);
    });
  }
}
