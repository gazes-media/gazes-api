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

    public handler: RouteHandlerMethod = async (request, reply) => {
        // // get body from request
        // const { user } = request.body as { user: DecodedIdToken };
        // AppDataSource.getRepository(Favoris).find({ where: { user: {
        //     googleId: user.uid
        // }}}).then((u) => {
        //     // Trie des épisodes par "animé" puis par "date de visionnage"
        //     if(!u) return reply.send({
        //         success: true,
        //         animes: []
        //     });

        //     const animes: Anime[] = [];
        //     u.forEach((a) => {
        //         const anime = AnimeStore.vostfr.find((anime) => anime.id === a.animeId);
        //         if(anime){
        //             animes.push(anime);
        //         }
        //     });

        //     return reply.send({
        //         success: true,
        //         animes: animes
        //     });
        // }).catch((error) => {
        //     return reply.send({
        //         success: false,
        //         error: error
        //     });
        // });

        const body = request.body as { user: DecodedIdToken };
        const favoriteRepository = AppDataSource.getRepository(Favoris);

        const favorites = await favoriteRepository.find({
            where: {
                user: { googleId: body.user.uid },
            },
        });

        if (!favorites) {
            return reply.status(200).send({
                success: true,
                data: [],
            });
        }

        const animes = favorites.filter((a) => AnimeStore.vostfr.find((anime) => anime.id === a.animeId));

        return reply.send({
            success: true,
            data: animes,
        });
    };
}
