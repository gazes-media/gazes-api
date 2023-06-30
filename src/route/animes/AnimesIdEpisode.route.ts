import { HTTPMethods, RouteHandlerMethod } from "fastify";
import { Route } from "../Route";
import { AnimeStore } from "../../store/animes.store";

interface Params {
  lang: string;
  id: any;
  episodeNumber: any;
}

export class AnimesIdEpisodeRoute extends Route {
  public url: string = "/animes/:id/:episodeNumber";
  public method: HTTPMethods = "GET";

  public handler: RouteHandlerMethod = async (request, reply) => {
    let { id, episodeNumber } = request.params as Params;
    episodeNumber = parseInt(episodeNumber);
    id = parseInt(id);

    /* These are validation checks being performed on the `lang`, `id`, and `episode` parameters
      received in the request. */
    if (isNaN(id)) {
      return reply.status(400).send({
        success: false,
        message: "Specified ID is NaN",
      });
    }

    if (isNaN(episodeNumber)) {
      return reply.status(400).send({
        success: false,
        message: "Specified episode is NaN",
      });
    }

    let animeVostfr = AnimeStore.vostfr.find((anime) => anime.id === id);
    let animeVf = AnimeStore.vf.find((anime) => anime.id === id);

    /* These are error checks being performed on the `anime` object retrieved from the `AnimeStore`. */
    if (!animeVostfr) {
      return reply.status(204).send({
        success: false,
        message: `Anime with id ${id} not found`,
      });
    }

    animeVostfr = await AnimeStore.get(id, "vostfr");

    if (animeVostfr.episodes.length < episodeNumber) {
      return reply.status(204).send({
        success: false,
        message: `Anime with id ${id} has no episode ${episodeNumber}.`,
      });
    }

    const episode = animeVostfr.episodes[episodeNumber - 1];
    const EpisodeURIExist = await AnimeStore.getEpisodeVideo(episode);

    if (!EpisodeURIExist) {
      return reply.status(204).send({
        success: false,
        message: `Anime with id ${id} has no episode ${episodeNumber}.`,
      });
    }

    let response = {
      vostfr: {
        videoUri: "https://proxy.ketsuna.com?url=" + encodeURIComponent(EpisodeURIExist.uri),
        videoVtt: EpisodeURIExist.subtitlesVtt,
        videoBaseUrl: EpisodeURIExist.baseUrl,
        ...episode,
      },
    };

    if (animeVf) {
      animeVf = await AnimeStore.get(id, "vf");

      if (animeVf.episodes.length > parseInt(episodeNumber)) {
        const episodeVf = animeVf.episodes[episodeNumber - 1];
        const datas = await AnimeStore.getEpisodeVideo(episodeVf);

        if (datas) {
          response["vf"] = {
            videoUri: "https://proxy.ketsuna.com?url=" + encodeURIComponent(datas.uri),
            videoVtt: datas.subtitlesVtt,
            videoBaseUrl: datas.baseUrl,
            ...episodeVf,
          };
        }
      }
    }

    return reply.status(200).send({
      success: true,
      data: response,
    });
  };
}
