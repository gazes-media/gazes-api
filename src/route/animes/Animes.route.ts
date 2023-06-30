import { HTTPMethods, RouteHandlerMethod } from "fastify";
import { Route } from "../Route";
import { AnimeStore } from "../../store/animes.store";
import { Anime } from "../../interfaces/anime.interface";

export class AnimesRoute extends Route {
  public url = "/animes";
  public method: HTTPMethods = "GET";

  public handler: RouteHandlerMethod = (request, reply) => {
    // récupérer les possible queries
    let { types, lang, status, genres, year, title } = request.query as { types?: string; lang?: "vf" | "vostfr"; status?: string; genres?: string; year?: string; title?: string };

    let animes = lang == "vf" ? AnimeStore.vostfr : AnimeStore.vf;

    /**
     * The function filters an array of anime objects based on various criteria such as type, language,
     * status, genres, and years.
     */
    function animesFilter(a: Anime) {
      let bool = true;

      if (types && !types.split(",").includes(a.type.toString())) bool = false;
      if (status && a.status !== status) bool = false;

      if (genres) {
        genres.split(",").forEach((genre) => {
          if (!a.genres.includes(genre)) bool = false;
        });
      }

      if (year && !year.includes(a.start_date_year)) bool = false;

      return bool;
    }

    animes = animes.filter(animesFilter);

    /**
     * The function `titleFilter` takes an `Anime` object and a `title` string as input, and returns
     * `true` if any of the titles in the `Anime` object (including English, French, Romanji, and
     * others) contain the `title` string (case-insensitive), otherwise it returns `false`.
     */
    function titleFilter(a: Anime) {
      let bool = false;
      title = title.toLowerCase().replace(" ", "");

      if (a.title.toLowerCase().includes(title)) bool = true;
      if (a.title_english && a.title_english.toLowerCase().replace(" ", "").includes(title)) bool = true;
      if (a.title_french && a.title_french.toLowerCase().replace(" ", "").includes(title)) bool = true;
      if (a.title_romanji && a.title_romanji.toLowerCase().replace(" ", "").includes(title)) bool = true;
      if (a.others && a.others.toLowerCase().replace(" ", "").includes(title)) bool = true;

      return bool;
    }

    if (title) animes = animes.filter(titleFilter);

    if (animes.length <= 0) {
      return reply.status(204).send({
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
