import { HTTPMethods, RouteHandlerMethod } from "fastify";
import { Route } from "../Route";
import { AnimeStore } from "../../store/animes.store";
import { Anime } from "../../interfaces/anime.interface";
import { animeType } from "../../enums/animeType.enum";

export class AnimesRoute extends Route {
  public url = "/animes";
  public method: HTTPMethods = "GET";

  public handler: RouteHandlerMethod = (request, reply) => {
    let { type, lang, status, genres, year, title } = request.query as {
      type?: string;
      lang?: "vf" | "vostfr";
      status?: string;
      genres?: string;
      year?: string;
      title?: string;
    };
    let typeSeparated: animeType[] = [], genresSeparated: string[] = [], AnimeList: Anime[] = [], yearSeparated: string[] = [], filterUsed = false;
    if (type) {
      filterUsed = true;
      // type are separated by a comma in the url
      typeSeparated = type.split(",") as unknown as animeType[];
      // do a loop on the type to get the animes of each type
      typeSeparated.forEach((type) => {
        AnimeList = AnimeList.concat(AnimeStore.vostfr.filter((anime) => anime.type === type));
      });
    }

    if (genres) {
      filterUsed = true;
      // genres are separated by a comma in the url
      genresSeparated = genres.split(",");

      // verify if the animelist is empty or not
      if (AnimeList.length === 0) {
        AnimeList = AnimeStore.vostfr;
      }
      // be sure ALL genres are present in the anime
      for (genres of genresSeparated) {
        AnimeList = AnimeList.filter((anime) => anime.genres.includes(genres));
      }


    }

    // verify if other types are specified
    if (year) {
      filterUsed = true;
      yearSeparated = year.split(",");
      if (AnimeList.length === 0) {
        yearSeparated.forEach((year) => {
          AnimeList = AnimeList.concat(AnimeStore.vostfr.filter((anime) => anime.start_date_year == year));
        });
      } else {
        yearSeparated.forEach((year) => {
          AnimeList = AnimeList.filter((anime) => anime.start_date_year == year);
        });
      }
    }


    if (title) {
      filterUsed = true;
      if (AnimeList.length === 0) {
        AnimeList = AnimeStore.vostfr;
      }

      // lookup for the title in the animeList
      AnimeList = AnimeList.filter((anime) => {
        let found = false;
        if (anime.title) {
          found = anime.title.toLowerCase().includes(title.toLowerCase());
        }
        if (anime.title_english) {
          if (found) return found;
          found = anime.title_english.toLowerCase().includes(title.toLowerCase());
        }
        if (anime.title_romanji) {
          if (found) return found;
          found = anime.title_romanji.toLowerCase().includes(title.toLowerCase());
        }
        if (anime.others) {
          if (found) return found;
          found = anime.others.toLowerCase().includes(title.toLowerCase());
        }
        // if not found return false
        return found;
      });

    }

    if (status) {
      filterUsed = true;
      // status are separated by a comma in the url
      if (AnimeList.length === 0) {
        AnimeList = AnimeStore.vostfr;
      }
      AnimeList = AnimeList.filter((anime) => anime.status === status);
    }



    if (filterUsed) {
      if (AnimeList.length === 0) {
        reply.send([]);
      } else {
        reply.send(AnimeList);
      }
    } else {
      reply.send(AnimeStore.vostfr);
    }

  };
}


