import { HTTPMethods, RouteHandlerMethod } from "fastify";
import { Route } from "../Route";
import { AnimeStore } from "../../store/animes.store";

interface Params {
  lang: string;
  id: string;
  episodeNumber: string;
}

export class AnimesLangIdEpisodeRoute extends Route {
  public url: string = "/animes/:lang/:id/:episodeNumber";
  public method: HTTPMethods = "GET";

  public handler: RouteHandlerMethod = async (request, reply) => {
    return new Promise(async (resolve, reject) => {
      const { lang, id, episodeNumber } = request.params as Params;

      /* These are validation checks being performed on the `lang`, `id`, and `episode` parameters
      received in the request. */
      if (lang !== "vf" && lang !== "vostfr") return resolve(reply.status(404).send({ error: `Anime with id ${id} not found.` }));
      if (isNaN(Number(id))) return resolve(reply.status(400).send({ error: "Anime id must be a number." }));
      if (isNaN(Number(episodeNumber))) return resolve(reply.status(400).send({ error: "Anime episode must be a number." }));

      const anime = await AnimeStore.get(id, lang);

      /* These are error checks being performed on the `anime` object retrieved from the `AnimeStore`. */
      if (!anime) return resolve(reply.status(400).send({ error: `Anime with id ${id} not found.` }));
      if (anime.episodes.length < Number(episodeNumber)) return resolve(reply.status(400).send({ error: `Anime with id ${id} has no episode ${episodeNumber}.` }));

      const episode = anime.episodes[Number(episodeNumber) - 1];
      const { uri, subtitlesVtt, baseUrl } = await AnimeStore.getEpisodeVideo(episode);

      return resolve(reply.status(200).send({ videoUri: uri, videoVtt: subtitlesVtt, videoBaseUrl: baseUrl, ...episode }));
    });
  };
}
