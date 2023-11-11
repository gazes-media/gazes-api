import { animeType } from "../enums/animeType.enum";
import { Episode } from "./episode.interface";

export interface Anime {
    id: number;
    title: string;
    title_english: string;
    title_romanji: string;
    title_french: string | null;
    others: string;

    type: animeType;
    status: string; //TODO change this to a status enum
    popularity: number;
    url: string;
    genres: string[]; //TODO change this to a genre enum array
    url_image: string;
    score: string;
    start_date_year: string;
    nb_eps: string;
    lang?: "vf" | "vostfr";

    episodes?: Episode[];
    coverUrl?: string;
    synopsis?: string;
}
