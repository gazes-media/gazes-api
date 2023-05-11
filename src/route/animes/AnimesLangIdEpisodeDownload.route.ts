import { HTTPMethods, RouteHandlerMethod } from "fastify";
import { Route } from "../Route";
import { AnimeStore } from "../../store/animes.store";
import { spawn } from "child_process";
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
      const videoName = new Date().getTime() + anime.title + " " + episodeNumber + ".mp4";

      const video = spawn(`ffmpeg -y -i "${videoUrl}" -protocol_whitelist https,tls,file,tcp -bsf:a aac_adtstoasc -vcodec copy "${videoName}"`, {
        shell: true,
      });

      video.on("close", (code) => {
        console.log(`child process exited with code ${code}`);
        resolve(reply.send(fs.createReadStream(videoName)).status(200).header('Content-Type', 'video/mp4').header('Content-Disposition', `attachment; filename="${videoName}"`).header('Content-Length', fs.statSync(videoName).size).header('Accept-Ranges', 'bytes').header('Connection', 'keep-alive'));
        fs.unlinkSync(videoName);
      });

    });
  };
}
