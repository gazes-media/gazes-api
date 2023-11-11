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

    public handler: RouteHandlerMethod = async (request, reply) => {
        // get body from request

        const body = request.body as { user: DecodedIdToken; id: number };
        if (!body.id) return reply.status(400).send({ error: "Anime id is required." });

        // check if anime exist
        const anime = AnimeStore.vostfr.find((anime) => anime.id === body.id);
        if (!anime) return reply.status(404).send({ error: "Anime not found." });

        const user = await AppDataSource.getRepository(User).save({ googleId: body.user.uid });
        const favorite = await AppDataSource.getRepository(Favoris).save({ user: user, animeId: body.id });

        return reply.send({
            success: true,
            data: favorite,
        });
    };
}
