import { HTTPMethods, RouteHandlerMethod } from "fastify";
import { Route } from "../Route";
import { AnimeStore } from "../../store/animes.store";

interface Params {
  lang: string;
  id: string;
  episodeNumber: string;
}

export class AnimesIdEpisodeRoute extends Route {
  public url: string = "/animes/:id/:episodeNumber";
  public method: HTTPMethods = "GET";

  public handler: RouteHandlerMethod = async (request, reply) => {
    return new Promise(async (resolve, reject) => {
      const { id, episodeNumber } = request.params as Params;

      /* These are validation checks being performed on the `lang`, `id`, and `episode` parameters
      received in the request. */
      if (isNaN(Number(id))) return resolve(reply.status(400).send({ error: "Anime id must be a number." }));
      if (isNaN(Number(episodeNumber))) return resolve(reply.status(400).send({ error: "Anime episode must be a number." }));

      let animeVostfr = AnimeStore.vostfr.find((anime) => anime.id === Number(id));
      let animeVf = AnimeStore.vf.find((anime) => anime.id === Number(id));

      /* These are error checks being performed on the `anime` object retrieved from the `AnimeStore`. */
      if (!animeVostfr) return resolve(reply.status(400).send({ error: `Anime with id ${id} not found.` }));
      animeVostfr = await AnimeStore.get(id, "vostfr");
      if (animeVostfr.episodes.length < Number(episodeNumber)) return resolve(reply.status(400).send({ error: `Anime with id ${id} has no episode ${episodeNumber}.` }));
      const episode = animeVostfr.episodes[Number(episodeNumber) - 1];
      const EpisodeURIExist = await AnimeStore.getEpisodeVideo(episode);
      if(!EpisodeURIExist) return resolve(reply.status(400).send({ error: `Anime with id ${id} has no episode ${episodeNumber}.` }));
      let reponse = {
        vostfr: {
          videoUri: EpisodeURIExist.uri,
          videoVtt: EpisodeURIExist.subtitlesVtt,
          videoBaseUrl: EpisodeURIExist.baseUrl,
          ...episode
        }
      };
      if(animeVf){
        animeVf = await AnimeStore.get(id, "vf");
        let episodeVfExist = false;
        if (animeVf.episodes.length < Number(episodeNumber)) episodeVfExist = false;
        else episodeVfExist = true;
        if(episodeVfExist){
          const episodeVf = animeVf.episodes[Number(episodeNumber) - 1];
          const datas = await AnimeStore.getEpisodeVideo(episodeVf);
          if(datas){
          reponse["vf"] = {
              videoUri: datas.uri,
              videoVtt: datas.subtitlesVtt,
              videoBaseUrl: datas.baseUrl,
              ...episodeVf
            };
          }
        }
      }

      return resolve(reply.status(200).send(reponse));
    });
  };
}
