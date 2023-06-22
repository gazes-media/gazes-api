import { HTTPMethods, RouteHandlerMethod } from "fastify";
import { Route } from "../Route";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import { Anime } from "../../interfaces/animeDatabase.interface";
import { Anime as AnimeEntity } from "../../entity/Anime";
import { FastifyRequestNew } from "../../interfaces/requestNew.interface";
export class UserAnimesRoute extends Route {
    public url = "/users/animes";
    public method: HTTPMethods = "POST";

    public handler: RouteHandlerMethod = (request: FastifyRequestNew, reply) => {
        // get body from request
        const { Anime, user } = request.body as { user: DecodedIdToken, Anime: Anime };
        if(!Anime.id){
            return reply.status(400).send({ error: "Anime id is required." });
        }
        if(!Anime.time){
            return reply.status(400).send({ error: "Anime time is required." });
        }
        if(!Anime.duration){
            return reply.status(400).send({ error: "Anime duration is required." });
        }
        if(!Anime.episode){
            return reply.status(400).send({ error: "Anime episode is required." });
        }
        AppDataSource.getRepository(User).save({ googleId: user.uid }).then((u) => {
            AppDataSource.getRepository(AnimeEntity).findOne({ where: { id: Anime.id, episode: Anime.episode, user: {
                googleId: user.uid
            }} }).then((a) => {
                if (a) {
                    a.time = Anime.time;
                    a.date = new Date();
                } else {
                    a = new AnimeEntity();
                    a.id = Anime.id;
                    a.time = Anime.time;
                    a.user = u;
                    a.duration = Anime.duration;
                    a.episode = Anime.episode;
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


