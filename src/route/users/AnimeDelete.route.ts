import { HTTPMethods, RouteHandlerMethod } from "fastify";
import { Route } from "../Route";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import { Anime } from "../../interfaces/animeDatabase.interface";
import { Anime as AnimeEntity } from "../../entity/Anime";
import { FastifyRequestNew } from "../../interfaces/requestNew.interface";

type RouteBody = { user: DecodedIdToken } & Anime;
export class UserAnimesDeleteRoute extends Route {
    public url = "/users/animes";
    public method: HTTPMethods = "DELETE";

    public handler: RouteHandlerMethod = async (request: FastifyRequestNew, reply) => {
        const body = request.body as RouteBody;

        /* verify that every required fields of the body are gived */
        if (!body.id) return reply.status(400).send({ success: false, message: "Anime id is required." });
        if (!body.episode) return reply.status(400).send({ success: false, message: "Episode is required." });

        await AppDataSource.getRepository(User).save({ googleId: body.user.uid });
        const animeRepository = AppDataSource.getRepository(AnimeEntity);

        const anime = await animeRepository.findOne({
            where: {
                id: body.id,
                episode: body.episode,
                user: { googleId: body.user.uid },
            },
            loadRelationIds: true,
        });

        if (!anime) {
            return reply.status(404).send({
                success: false,
                message: "Anime not found",
            });
        }

        const deleted = await animeRepository.delete(anime);

        if (deleted.affected === 0) {
            return reply.status(404).send({
                succes: false,
                error: "Anime not found",
            });
        }

        return reply.send({
            success: true,
            data: anime,
        });
    };
}
