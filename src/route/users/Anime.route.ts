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

    public handler: RouteHandlerMethod = (request: FastifyRequestNew, reply) => {
        // get body from request
        const { id, time, duration, episode, user } = request.body as RouteBody;
        if(!id){
            return reply.status(400).send({ error: "Anime id is required." });
        }
        if(!time){
            return reply.status(400).send({ error: "Anime time is required." });
        }
        if(!duration){
            return reply.status(400).send({ error: "Anime duration is required." });
        }
        if(!episode){
            return reply.status(400).send({ error: "Anime episode is required." });
        }
        AppDataSource.getRepository(User).save({ googleId: user.uid }).then((u) => {
            AppDataSource.getRepository(AnimeEntity).findOne({ where: { id: id, episode: episode, user: {
                googleId: user.uid
            }} }).then((a) => {
                if (a) {
                    a.time = time;
                    a.date = new Date();
                } else {
                    a = new AnimeEntity();
                    a.id = id;
                    a.time = time;
                    a.user = u;
                    a.duration = duration;
                    a.episode = episode;
                    a.date = new Date();
                }
                AppDataSource.getRepository(AnimeEntity).save(a).then((aUpdated) => {
                   return reply.send({
                        success: true,
                        anime: aUpdated
                    });
                });
            });
        });
    }
}


