import { Anime } from "../../interfaces/anime.interface";
import { HTTPMethods, RouteHandlerMethod } from "fastify";
import { Route } from "../Route";
import { AnimeStore } from "../../store/animes.store";
import Fuse from "fuse.js";

export type seasons = {
    year: number,
    fiche: Anime
}

export type seasonal = {
    anime: string,
    id: number,
    seasons: seasons[]
}

export function returnSeasonal(animes: Anime[]): seasonal[] {
    let seasonal: seasonal[] = [];
    animes.forEach((anime) => {
        let animeName = anime.title;
        let id = anime.id;
        let year = parseInt(anime.start_date_year);
        let index = seasonal.findIndex((seasonal) => seasonal.anime.startsWith(animeName));
        if(index === -1) {
            seasonal.push({
                anime: animeName,
                id: id,
                seasons: [{
                    year: year,
                    fiche: anime
                }]
            })
        }
        else {
            seasonal[index].seasons.push({
                year: year,
                fiche: anime
            })
        }
    })

    // we make a sort.
    return seasonal;
}

export class AnimesSeasonsRoute extends Route {
  public url = "/animes/seasons";
  public method: HTTPMethods = "GET";

  public handler: RouteHandlerMethod = (request, reply) => {
    // récupérer les possible queries
    let { title } = request.query as { title?: string };

    let animes = AnimeStore.vostfr;
    let seasons = returnSeasonal(animes);


    if (title) {
      const fuse = new Fuse(seasons, {
        keys: ["anime"],
        includeScore: false,
      });

      seasons = fuse.search(title).map((a) => a.item);
    }

    if (seasons.length <= 0) {
      console.log(animes);
      return reply.status(404).send({
        success: false,
        message: "La requête a été traitée avec succès, mais aucun contenu n'est disponible pour la réponse demandée.",
      });
    }

    return reply.send({
      success: true,
      data: seasons,
    });
  };
}
