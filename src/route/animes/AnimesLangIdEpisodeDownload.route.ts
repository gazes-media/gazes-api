import { HTTPMethods, RouteHandlerMethod } from "fastify";
import { Route } from "../Route";
import { AnimeStore } from "../../store/animes.store";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import fs from "fs";
import axios from "axios";

interface Params {
  lang: string;
  id: string;
  episodeNumber: string;
}

export class AnimesLangIdEpisodeDownloadRoute extends Route {
  public url: string = "/animes/:lang/:id/:episodeNumber/download";
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

      //   TODO convert m3u8 uri to mp4
      const videoUrl = "https://proxy.ketsuna.com/?url=" + encodeURIComponent(uri);
      const videoName = new Date().getTime();

      const ffmpeg = createFFmpeg({ log: true });
      await ffmpeg.load();

      ffmpeg.FS("writeFile", `${videoName}.m3u8`, await fetchFile(videoUrl));
      await ffmpeg.run("-i", `${videoName}.m3u8`, `${videoName}.mp4`);
      await fs.promises.writeFile(`${videoName}.mp4`, ffmpeg.FS("readFile", `${videoName}.mp4`));

      return resolve(reply.status(200).send("ok"));
    });
  };
}
