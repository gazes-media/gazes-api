import { HTTPMethods, RouteHandlerMethod } from "fastify";
import { Route } from "../Route";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import { Anime } from "../../interfaces/animeDatabase.interface";
import { Anime as AnimeEntity } from "../../entity/Anime";
import { FastifyRequestNew } from "../../interfaces/requestNew.interface";

type RouteBody = { user: DecodedIdToken } & Anime;
export class UserAnimesRoute extends Route {
    public url = "/users/animes";
    public method: HTTPMethods = "POST";

    public handler: RouteHandlerMethod = async (request: FastifyRequestNew, reply) => {
        const body = request.body as RouteBody;

        /* verify that every required fields of the body are defined */
        if (!body.id) return reply.status(400).send({ success: false, message: "Anime id is required." });
        if (!body.time) return reply.status(400).send({ success: false, message: "Time where the user stoped is required." });
        if (!body.duration) return reply.status(400).send({ success: false, message: "Duration of the anime required." });
        if (!body.episode) return reply.status(400).send({ success: false, message: "Episode is required." });

        const repository = AppDataSource.getRepository(User);

        /* get the user and the anime in the database */
        const user = await repository.save({ googleId: body.user.uid });
        let anime = await AppDataSource.getRepository(AnimeEntity).findOne({
            where: {
                id: body.id,
                episode: body.episode,
                user: { googleId: body.user.uid },
            },
        });

        /* if the anime exists in the database, just update the time and the date else, create a new anime in the database */
        if (anime) [anime.time, anime.date] = [body.time, new Date()];
        else [anime, anime.id, anime.time, anime.user, anime.duration, anime.episode, anime.date] = [new AnimeEntity(), body.id, body.time, user, body.duration, body.episode, new Date()];

        return reply.send({
            success: true,
            anime: await AppDataSource.getRepository(AnimeEntity).save(anime),
        });
    };
}
