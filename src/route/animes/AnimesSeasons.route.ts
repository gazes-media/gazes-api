import { Anime } from "../../interfaces/anime.interface";
import { HTTPMethods, RouteHandlerMethod } from "fastify";
import { Route } from "../Route";
import { AnimeStore } from "../../store/animes.store";
import Fuse from "fuse.js";

export type seasons = {
    year: number,
    fiche: Anime
}

export type seasonal = {
    anime: string,
    id: number,
    seasons: seasons[]
}

export function groupAnimeBySimilarName(animeList: Anime[]):seasonal[] {
        const groupedAnime: { [anime: string]: number[] } = {};
      
        animeList.forEach((anime) => {
        let animeTitle = anime.title.trim(); // Supprimez les espaces inutiles autour du titre
        let id = anime.id
          let matched = false;
      
          for (const existingAnime in groupedAnime) {
            const regex = new RegExp(`\\b${existingAnime.replace("[","").replace("]","")}\\b`, 'i'); // Recherche correspondance avec des mots complets, insensible à la casse
            if (regex.test(animeTitle)) {
              groupedAnime[existingAnime].push(id);
              matched = true;
              break;
            }
          }
      
          if (!matched) {
            groupedAnime[animeTitle] = [id];
          }
        });
      
        const result = Object.keys(groupedAnime).map((animeName) => ({
          anime: animeName,
          id: animeList.find((anime) => anime.id === groupedAnime[animeName][0]).id,
          seasons: groupedAnime[animeName].map((id) => ({
            year: parseInt(animeList.find((anime) => anime.id === id).start_date_year),
            fiche: animeList.find((anime) => anime.id === id),
            })).sort((a, b) => a.year - b.year),
        }));
      
        return result;
      }

export class AnimesSeasonsRoute extends Route {
  public url = "/animes/seasons";
  public method: HTTPMethods = "GET";

  public handler: RouteHandlerMethod = (request, reply) => {
    // récupérer les possible queries
    let { title } = request.query as { title?: string };

    let animes = AnimeStore.vostfr;
    let seasons = groupAnimeBySimilarName(animes);


    if (title) {
      const fuse = new Fuse(seasons, {
        keys: ["anime"],
        includeScore: false,
      });

      seasons = fuse.search(title).map((a) => a.item);
    }

    if (seasons.length <= 0) {
      console.log(animes);
      return reply.status(404).send({
        success: false,
        message: "La requête a été traitée avec succès, mais aucun contenu n'est disponible pour la réponse demandée.",
      });
    }

    return reply.send({
      success: true,
      data: seasons,
    });
  };
}
