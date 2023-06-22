import { HTTPMethods, RouteHandlerMethod } from "fastify";
import { Route } from "../Route";
import { AnimeStore } from "../../store/animes.store";
import { Anime } from "../../interfaces/anime.interface";
import { animeType } from "../../enums/animeType.enum";

export class AnimesRoute extends Route {
  public url = "/animes";
  public method: HTTPMethods = "GET";

  public handler: RouteHandlerMethod = (request, reply) => {
    let { type, lang, status, genres, year } = request.query as {
      type?: string;
      lang?: "vf" | "vostfr";
      status?: string;
      genres?: string;
      year?: string;
    };
    let typeSeparated: animeType[] = [], genresSeparated: string[] = [], AnimeList: Anime[] = [], yearSeparated: string[] = [];
    if (type) {
      // type are separated by a comma in the url
      typeSeparated = type.split(",") as unknown as animeType[];
      // do a loop on the type to get the animes of each type
      typeSeparated.forEach((type) => {
        AnimeList = AnimeList.concat(AnimeStore.all.filter((anime) => anime.type === type));
      });
    }

    if (genres) {
      // genres are separated by a comma in the url
      genresSeparated = genres.split(",");

      // verify if the animelist is empty or not
      if (AnimeList.length === 0) {
        AnimeList = AnimeStore.all;
      }
        // be sure ALL genres are present in the anime
        for(genres of genresSeparated){
          AnimeList = AnimeList.filter((anime) => anime.genres.includes(genres));
        }
      

    }

    // verify if other types are specified
    if (year) {
      yearSeparated = year.split(",");
      if (AnimeList.length === 0) {
        yearSeparated.forEach((year) => {
          AnimeList = AnimeList.concat(AnimeStore.all.filter((anime) => anime.start_date_year == year));
        });
      } else {
        yearSeparated.forEach((year) => {
          AnimeList = AnimeList.filter((anime) => anime.start_date_year == year);
        });
      }
    }

    if (lang) {
      // verify if the animelist is empty or not
      if (AnimeList.length === 0) {
        // if empty we do a regular filter on the AnimeStore.all
        if (lang == "vf") {
          reply.send({
            vf: AnimeStore.vf,
          });
        } else {
          reply.send({
            vostfr: AnimeStore.vostfr,
          });
        }

      } else {
        if (lang == "vf") {
          reply.send({
            vf: AnimeList.filter((anime) => anime.lang === "vf"),
          });
        } else {
          reply.send({
            vostfr: AnimeList.filter((anime) => anime.lang === "vostfr"),
          });
        }
      }

    }

    if (AnimeList.length === 0) {
      reply.send({
        vf: AnimeStore.vf,
        vostfr: AnimeStore.vostfr,
      });
    } else {
      reply.send({
        vf: AnimeList.filter((anime) => anime.lang === "vf"),
        vostfr: AnimeList.filter((anime) => anime.lang === "vostfr"),
      });
    }
  };
}


