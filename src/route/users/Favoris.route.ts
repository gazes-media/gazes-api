import { HTTPMethods, RouteHandlerMethod } from "fastify";
import { Route } from "../Route";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { AppDataSource } from "../../data-source";
import { Favoris } from "../../entity/User";
import { AnimeStore } from "../../store/animes.store";
import { Anime } from "../../interfaces/anime.interface";


export class UserFavorisRoute extends Route {
    public url = "/users/favoris";
    public method: HTTPMethods = "GET";

    public handler: RouteHandlerMethod = (request, reply) => {
        // get body from request
        const { user } = request.body as { user: DecodedIdToken };
        AppDataSource.getRepository(Favoris).find({ where: { user: {
            googleId: user.uid
        }}}).then((u) => {
            // Trie des épisodes par "animé" puis par "date de visionnage"
            if(!u) return reply.send({
                success: true,
                animes: []
            });

            const animes: {
                vf: Anime[],
                vostfr: Anime[]
            } = {
                vf: [],
                vostfr: []
            };
            u.forEach((a) => {
                const anime = AnimeStore.vostfr.find((anime) => anime.id === a.animeId);
                if(anime){
                    animes.vostfr.push(anime);
                    let animeVf = AnimeStore.vf.find((animeVf) => animeVf.id === a.animeId);
                    if(animeVf){
                        animes.vf.push(animeVf);
                    }
                }
            });
        
            return reply.send({
                success: true,
                animes: animes
            });
        }).catch((error) => {
            return reply.send({
                success: false,
                error: error
            });
        });
    }
}


