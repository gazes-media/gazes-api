import { Anime } from "../../interfaces/anime.interface";
import { HTTPMethods, RouteHandlerMethod } from "fastify";
import { Route } from "../Route";
import { AnimeStore } from "../../store/animes.store";
import Fuse from "fuse.js";



export class AnimesSeasonsRoute extends Route {
  public url = "/animes/seasons";
  public method: HTTPMethods = "GET";

  public handler: RouteHandlerMethod = (request, reply) => {
    // récupérer les possible queries
    let { title } = request.query as { title?: string };
    let seasons = AnimeStore.seasons;
    if(seasons.length <= 0) {
      AnimeStore.groupAnimeBySimilarName(AnimeStore.vostfr);
      seasons = AnimeStore.seasons;
    }
    if (title) {
      const fuse = new Fuse(seasons, {
        keys: ["title", "title_english", "title_romanji","others"],
        includeScore: false,
      });

      seasons = fuse.search(title).map((a) => a.item);
    }

    if (seasons.length <= 0) {
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
