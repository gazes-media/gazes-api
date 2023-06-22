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
               let wordLength = anime.synopsis.split(" ").length;
                if(wordLength > 32 && anime.coverUrl != "https://neko-sama.fr/images/default_background.png"){
                    resolve(anime);
                }else{
                    resolve(pickRandomAnimeWithAtLeastAsynopsisDecent());
                }
            });
        });
    }

    const randomized = await pickRandomAnimeWithAtLeastAsynopsisDecent();
    // replace the /0/ in the url with /1/ to get the cover image
    randomized.url_image = randomized.url_image.replace("/2/", "/1/");
    reply.status(200).send(randomized);    
  };
}
