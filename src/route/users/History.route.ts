import { HTTPMethods, RouteHandlerMethod } from "fastify";
import { Route } from "../Route";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { AppDataSource } from "../../data-source";
import { Anime } from "../../entity/Anime";

export class UserHistoryRoute extends Route {
    public url = "/users/history";
    public method: HTTPMethods = "GET";

    public handler: RouteHandlerMethod = async (request, reply) => {
        const body = request.body as { user: DecodedIdToken };

        const userHistory = await AppDataSource.getRepository(Anime).find({
            where: { user: { googleId: body.user.uid } },
            order: { date: "DESC" },
        });

        if (!userHistory) {
            return reply.send({
                success: true,
                data: [],
            });
        }

        const animes = userHistory.reduce((acc, anime) => {
            const a = acc.find((a) => a.id === anime.id);

            if (a) a.episodes.push({ ...anime });
            else acc.push({ id: anime.id, episodes: [{ ...anime }] });

            return acc;
        }, []);

        reply.status(200).send({
            success: true,
            data: animes,
        });
    };
}
