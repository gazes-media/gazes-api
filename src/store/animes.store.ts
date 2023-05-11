import axios from "axios";
import { LatestEpisode } from "../interfaces/latest.interface";
import { Anime } from "../interfaces/anime.interface";
import { Episode } from "../interfaces/episode.interface";
import { load } from "cheerio";
import Subtitlesvtt from "../interfaces/subtitlesvtt.interface";
import { PstreamData } from "../interfaces/pstreamdata.interface";

const vostfrUrl = "https://neko.ketsuna.com/animes-search-vostfr.json";
const vfUrl = "https://neko.ketsuna.com/animes-search-vf.json";

export class AnimeStore {
  static all: Anime[] = [];
  static vf: Anime[] = [];
  static vostfr: Anime[] = [];
  static latest: LatestEpisode[] = [];

  /* The function fetches data from two different URLs and 
  combines them into one array with a language property added to 
  each object.*/
  static async fetchAll(): Promise<void> {
    this.vostfr = (await axios.get(vostfrUrl)).data;
    this.vf = (await axios.get(vfUrl)).data;
    this.all = [...this.vostfr.map((anime) => ({ ...anime, lang: "vostfr" as "vostfr" })), ...this.vf.map((anime) => ({ ...anime, lang: "vf" as "vf" }))];
  }

  /* This function fetches the latest episodes from a website 
  and stores them in an array. */
  static async fetchLatest(): Promise<void> {
    const { data } = await axios.get("https://neko.ketsuna.com");
    const parsedData = /var lastEpisodes = (.+)\;/gm.exec(data);

    let latestEpisodes: LatestEpisode[] = [];
    if (parsedData) latestEpisodes = JSON.parse(parsedData[1]);

    this.latest = latestEpisodes;
  }

  /* This function converts a string representing an episode
  number to a number data type in TypeScript. */
  static episodeToNumber(episode: string) {
    return Number(episode.replace("Ep. ", ""));
  }

  /* This function retrieves information about an anime based on 
  its ID and language, including its synopsis, cover image URL, 
  and episodes. */
  static async get(id: string, lang: "vf" | "vostfr"): Promise<undefined | Anime> {
    const anime = this[lang].find((anime) => anime.id.toString() == id);
    if (!anime) return Promise.resolve(undefined);

    const { data: animeHtml } = await axios.get(`https://neko.ketsuna.com/${anime.url}`);

    const synopsis = /(<div class="synopsis">\n<p>\n)(.*)/gm.exec(animeHtml)?.[2];
    const coverUrl = /(<div id="head" style="background-image: url\()(.*)(\);)/gm.exec(animeHtml)?.[2];
    const episodes = JSON.parse(/var episodes = (.+)\;/gm.exec(animeHtml)?.[1] as string);

    return { ...anime, synopsis, coverUrl, episodes };
  }

  /* This function retrieves the video URL and subtitle data for a given episode URL. */
  static async getEpisodeVideo(episode: Episode): Promise<undefined | { uri: string; subtitlesVtt: Subtitlesvtt[]; baseUrl: string }> {
    return new Promise(async (resolve, reject) => {
      const episodeUrl = `https://neko.ketsuna.com${episode.url}`;
      const { data: episodeHtml } = await axios.get(episodeUrl);

      const pstreamUrl = /(\n(.*)video\[0] = ')(.*)(';)/gm.exec(episodeHtml)?.[3];
      if (!pstreamUrl) {
        resolve(undefined);
      }

      const baseUrl = pstreamUrl.split("/").slice(0, 3).join("/");
      const pstreamUrlEncoded = encodeURIComponent(pstreamUrl);
      const pstreamUrlProxy = `https://proxy.ketsuna.com/?url=${pstreamUrlEncoded}`;

      const { data: pstreamHtml } = await axios.get(pstreamUrlProxy);
      const loadedHtml = load(pstreamHtml);

      const scripts = loadedHtml("script");
      const scriptSources = scripts.map((i, el) => loadedHtml(el).attr("src")).get();

      let videoUrl = "";
      let subtitlesVtt: Subtitlesvtt[] = [];

      for (const scriptSource of scriptSources) {
        const { data: pstreamScript } = await axios.get(`https://proxy.ketsuna.com/?url=${encodeURIComponent(scriptSource)}`);

        let videoUrlBase64 = /e.parseJSON\(atob\(t\).slice\(2\)\)\}\(\"([^;]*)"\),/gm.exec(pstreamScript)?.[1];
        if (!videoUrlBase64) {
          videoUrlBase64 = /n=atob\("([^"]+)"/gm.exec(pstreamScript)?.[1];
        }

        if (!videoUrlBase64) {
          continue;
        }

        const base64 = JSON.parse(atob(videoUrlBase64).slice(2));
        const pstream: PstreamData = base64;

        videoUrl = Object.values(pstream).find((data: any) => {
          if (typeof data === "string") {
            return data.startsWith("https://");
          }
        });

        subtitlesVtt = pstream.subtitlesvtt;
        if (videoUrl) {
          break;
        }
      }

      if (!videoUrl) {
        resolve(undefined);
      }

      resolve({
        uri: videoUrl,
        subtitlesVtt,
        baseUrl,
      } as { uri: string; subtitlesVtt: Subtitlesvtt[]; baseUrl: string });
    });
  }
}
