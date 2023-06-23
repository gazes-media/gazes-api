import { HTTPMethods, RouteHandlerMethod } from "fastify";
import { Route } from "../Route";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { AppDataSource } from "../../data-source";
import { AnimeStore } from "../../store/animes.store";
import { Anime } from "../../interfaces/anime.interface";
import { User, Favoris} from "../../entity/User";


export class UserFavorisDeleteRoute extends Route {
    public url = "/users/favoris";
    public method: HTTPMethods = "DELETE";

    public handler: RouteHandlerMethod = (request, reply) => {
        // get body from request

        const { id, user } = request.body as { user: DecodedIdToken, id: number };
        if (!id) {
            return reply.status(400).send({ error: "Anime id is required." });
        }
        AppDataSource.getRepository(User).save({ googleId: user.uid }).then((u) => {
            AppDataSource.getRepository(Favoris).findOne({
                where: {
                    user: {
                        googleId: user.uid
                    }, animeId: id
                }, loadRelationIds: true
            }).then((f) => {
                if (f) {
                    AppDataSource.getRepository(Favoris).delete(f).then((deleted) => {
                        if (deleted.affected === 0) return reply.status(404).send({
                            success: false,
                            error: "Anime not found in favoris"
                        });
                        return reply.send({
                            success: true,
                            deleted: true
                        });
                    });
                } else {
                    return reply.status(404).send({
                        success: false,
                        error: "Anime not found in favoris"
                    });
                }
            });
        });
    }
}
