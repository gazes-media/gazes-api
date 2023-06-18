import { HTTPMethods, RouteHandlerMethod } from "fastify";
import { Route } from "../Route";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import { AnimeSorted } from "../../interfaces/AnimeSorted.interface";

export class UserHistoryRoute extends Route {
    public url = "/users/history";
    public method: HTTPMethods = "GET";

    public handler: RouteHandlerMethod = (request, reply) => {
        // get body from request
        const { user } = request.body as { user: DecodedIdToken };
        AppDataSource.getRepository(User).findOne({ loadRelationIds: true, where: { googleId: user.uid } }).then((u) => {
            // Trie des épisodes par "animé" puis par "date de visionnage"
            let animes: AnimeSorted[] = [];
            u.history.forEach((a) => {
                if(animes[a.id]){
                    animes[a.id].episodes.push(a);
                } else {
                    animes[a.id] = { id: a.id, episodes: [a] };
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


