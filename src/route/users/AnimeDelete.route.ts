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

    public handler: RouteHandlerMethod = (request: FastifyRequestNew, reply) => {
        // get body from request
        const { id, episode, user } = request.body as RouteBody;
        if(!id){
            return reply.status(400).send({ error: "Anime id is required." });
        }
        if(!episode){
            return reply.status(400).send({ error: "Anime episode is required." });
        }
        AppDataSource.getRepository(User).save({ googleId: user.uid }).then((u) => {
            AppDataSource.getRepository(AnimeEntity).findOne({ where: { id: id, episode: episode, user: {
                googleId: user.uid
            }},loadRelationIds: true }).then((a) => {
                if (a) {
                    console.log(a);
                    AppDataSource.getRepository(AnimeEntity).delete(a).then((deleted) => {
                        if(deleted.affected === 0) return reply.status(404).send({
                            succes:false,
                            error: "Anime not found"
                        });
                        return reply.send({
                            anime: a,
                            deleted: true
                        });
                    });
                }else{
                    return reply.status(404).send({
                        succes:false,
                        error: "Anime not found"
                    });
                }
            });
        });
    }
}


