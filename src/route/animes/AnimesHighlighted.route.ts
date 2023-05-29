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
    // get a random anime from the list of vostfr animes

    async function pickRandomAnimeWithAtLeastAsynopsisDecent(): Promise<Anime> {
        const randomAnime = AnimeStore.vostfr[Math.floor(Math.random() * AnimeStore.vostfr.length)];
        return new Promise((resolve, reject) => {
            AnimeStore.get(randomAnime.id.toString(), "vostfr").then((anime) => {
                if(anime.synopsis.length > 50){
                    resolve(anime);
                }else{
                    resolve(pickRandomAnimeWithAtLeastAsynopsisDecent());
                }
            });
        });
    }

    const randomized = await pickRandomAnimeWithAtLeastAsynopsisDecent();
    reply.status(200).send(randomized);    
  };
}
