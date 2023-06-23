import { HTTPMethods, RouteHandlerMethod } from "fastify";
import { Route } from "../Route";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { AppDataSource } from "../../data-source";
import { Anime } from "../../interfaces/anime.interface";
import { User, Favoris } from "../../entity/User";
import { AnimeStore } from "../../store/animes.store";

export class UserFavorisPostRoute extends Route {
    public url = "/users/favoris";
    public method: HTTPMethods = "POST";

    public handler: RouteHandlerMethod = (request, reply) => {
        // get body from request

        const { id, user } = request.body as { user: DecodedIdToken, id: number };
        if (!id) {
            return reply.status(400).send({ error: "Anime id is required." });
        }
        // check if anime exist
        const anime = AnimeStore.vostfr.find((anime) => anime.id === id);
        if (!anime) {
            return reply.status(404).send({ error: "Anime not found." });
        }
        AppDataSource.getRepository(User).save({ googleId: user.uid }).then((u) => {
            AppDataSource.getRepository(Favoris).save({ user: u, animeId: id }).then((f) => {
                return reply.send({
                    success: true,
                    favoris: [f]
                });
            });
        });

        }
}


