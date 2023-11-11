import { HTTPMethods, RouteHandlerMethod } from "fastify";
import { Route } from "../Route";
import { AnimeStore } from "../../store/animes.store";
import { Anime } from "../../interfaces/anime.interface";

interface Params {
    lang: string;
}

/* Handle GET requests for anime data based on the language parameter. */
export class AnimeHighlightedRoute extends Route {
    public url = "/animes/highlighted";
    public method: HTTPMethods = "GET";

    public handler: RouteHandlerMethod = async (request, reply) => {
        /**
         * The function `pickRandomAnimeWithAtLeastAsynopsisDecent` picks a random anime from a store and
         * checks if it has a synopsis with at least 32 words and a non-default cover image, and if not,
         * recursively calls itself until a suitable anime is found.
         */
        async function pickRandomAnimeWithAtLeastAsynopsisDecent(): Promise<Anime> {
            const randomAnime = AnimeStore.vostfr[Math.floor(Math.random() * AnimeStore.vostfr.length)];
            return new Promise((resolve, reject) => {
                AnimeStore.get(randomAnime.id.toString(), "vostfr").then((anime) => {
                    let wordLength = anime.synopsis.split(" ").length;
                    if (wordLength > 32 && anime.coverUrl != "https://neko-sama.fr/images/default_background.png") {
                        resolve(anime);
                    } else {
                        resolve(pickRandomAnimeWithAtLeastAsynopsisDecent());
                    }
                });
            });
        }

        const randomized = await pickRandomAnimeWithAtLeastAsynopsisDecent();
        randomized.url_image = randomized.url_image.replace("/2/", "/1/");

        reply.status(200).send({
            success: true,
            data: randomized,
        });
    };
}
