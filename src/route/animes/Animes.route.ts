import { HTTPMethods, RouteHandlerMethod } from "fastify";
import { Route } from "../Route";
import { AnimeStore } from "../../store/animes.store";
import { Anime } from "../../interfaces/anime.interface";
import Fuse from "fuse.js";

export class AnimesRoute extends Route {
  public url = "/animes";
  public method: HTTPMethods = "GET";

  public handler: RouteHandlerMethod = (request, reply) => {
    // récupérer les possible queries
    let { types, status, genres, year, title } = request.query as { types?: string; status?: string; genres?: string; year?: string; title?: string };

    let animes = AnimeStore.vostfr;

    /**
     * The function filters an array of anime objects based on various criteria such as type, language,
     * status, genres, and years.
     */
    function animesFilter(a: Anime) {
      let toreturn = true;

      if (types && !types.split(",").includes(a.type.toString())) toreturn = false;
      if (status && a.status !== status) toreturn = false;

      if (genres) {
        genres
          .split(",")
          .filter((a) => a.startsWith("!"))
          .map((a) => a.replace("!", ""))
          .forEach((negativeGenre) => {
            if (a.genres.includes(negativeGenre)) toreturn = false;
          });

        genres
          .split(",")
          .filter((a) => !a.startsWith("!"))
          .forEach((positiveGenre) => {
            if (!a.genres.includes(positiveGenre)) toreturn = false;
          });
      }

      if (year && !year.includes(a.start_date_year)) toreturn = false;
      return toreturn;
    }

    animes = animes.filter(animesFilter);

    /**
     * The function `titleFilter` takes an `Anime` object and a `title` string as input, and returns
     * `true` if any of the titles in the `Anime` object (including English, French, Romanji, and
     * others) contain the `title` string (case-insensitive), otherwise it returns `false`.
     */
    if (title) {
      const fuse = new Fuse(animes, {
        keys: ["title", "title_english", "title_romanji", "title_french"],
        includeScore: false,
      });

      animes = fuse.search(title).map((a) => a.item);
    }

    if (animes.length <= 0) {
      console.log(animes);
      return reply.status(404).send({
        success: false,
        message: "La requête a été traitée avec succès, mais aucun contenu n'est disponible pour la réponse demandée.",
      });
    }

    return reply.send({
      success: true,
      data: animes,
    });
  };
}
