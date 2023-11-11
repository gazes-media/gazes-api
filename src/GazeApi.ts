import cors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import { spawn } from "child_process";
import fastify, { FastifyInstance, RouteOptions } from "fastify";
import { Middleware } from "./middleware/Middleware";
import { Route } from "./route/Route";
import { AnimeStore } from "./store/animes.store";

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

        this.fastify.listen({ host: "0.0.0.0", port }, (err, adress) => {
            if (err) {
                console.error(err);
                return;
            }

            console.log(`Server is starting on ${adress}`);
        });
    }

    /* This function toggles a smart cache by fetching and getting the latest episodes 
  of animes, and refreshing the cache every 10 minutes. */
    private async toggleSmartCache() {
        this.smartCache();
        setInterval(this.smartCache, 600000);
    }

    /**
     * Refreshes the cache by fetching all anime and the latest anime from the AnimeStore,
     * and runs a script to refresh the cache.
     * @returns {Promise<void>} A Promise that resolves when the cache has been refreshed.
     */
    private async smartCache() {
        await AnimeStore.fetchAll();
        await AnimeStore.fetchLatest();
        console.log(`♻️ cache refreshed (${AnimeStore.all.length} animes)`);

        try {
            const tri = spawn(`node`, [`${__dirname}/../scripts/tri.js`]);
            tri.on("close", (code) => console.log);
            tri.stdout.on("data", (data) => console.log);
        } catch (e) {
            console.error(e);
        }
    }
}
