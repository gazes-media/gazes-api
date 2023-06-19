import { HTTPMethods, RouteHandlerMethod } from "fastify";
import { Route } from "../Route";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import { AnimeSorted } from "../../interfaces/AnimeSorted.interface";
import { Anime } from "../../entity/Anime";

export class UserHistoryRoute extends Route {
    public url = "/users/history";
    public method: HTTPMethods = "GET";

    public handler: RouteHandlerMethod = (request, reply) => {
        // get body from request
        const { user } = request.body as { user: DecodedIdToken };
        AppDataSource.getRepository(Anime).find({ where: { user: {
            googleId: user.uid
        }}, order: {
            date: "DESC"
        }}).then((u) => {
            // Trie des épisodes par "animé" puis par "date de visionnage"
            if(!u) return reply.send({
                success: true,
                animes: []
            });

            const animes: AnimeSorted[] = [];
            u.forEach((a) => {
                const anime = animes.find((anime) => anime.id === a.id);
                if(anime){
                    anime.episodes.push(a);
                } else {
                    animes.push({
                        id: a.id,
                        episodes: [a]
                    });
                }
            });
            
            animes.forEach((a) => {
                a.episodes.sort((a, b) => {
                    return b.date.getTime() - a.date.getTime();
                });
            });

            return reply.send({
                success: true,
                animes: animes
            });
        });
    }
}


