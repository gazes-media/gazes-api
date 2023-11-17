import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { Cache } from 'cache-manager';
import { Anime, NekosamaAnime, AnimeGenre, nekoAnimeToAnime, nekoEpisodetoEpisode } from './animes.type';
import { z } from 'zod';

type getAnimesFields = {
    genres?: z.infer<typeof AnimeGenre>[];
    negativeGenres?: z.infer<typeof AnimeGenre>[];
    page?: number;
    start_date_year?: number;
};

@Injectable()
export class AnimesService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async getAnimes({ genres, negativeGenres, page, start_date_year }: getAnimesFields = {}) {
        let animes: Anime[] = await this.cacheManager.get<Anime[]>('animes');

        if (!animes) {
            const { data }: { data: NekosamaAnime[] } = await axios.get('https://neko.ketsuna.com/animes-search-vostfr.json');
            animes = data.map(nekoAnimeToAnime);
        }

        animes = animes.filter((anime) => {
            let test = true;

            if (genres && !genres.every((genre) => anime.genres.includes(genre))) test = false;
            if (negativeGenres && !negativeGenres.every((genre) => !anime.genres.includes(genre))) test = false;
            if (start_date_year && anime.start_date_year != start_date_year) test = false;

            return test;
        });

        if (page) animes = animes.slice(page, page + 25);
        return animes;
    }

    async getAnime(id: number): Promise<Anime | undefined> {
        const animes = await this.getAnimes();
        const anime = animes.find((anime) => anime.id == id);

        if (!anime) return undefined;

        const { data: animeHtml } = await axios.get(`https://neko.ketsuna.com/${anime.nekosama_url}`);

        const synopsis = /(<div class="synopsis">\n<p>\n)(.*)/gm.exec(animeHtml)?.[2];
        const banner_image_url = /(<div id="head" style="background-image: url\()(.*)(\);)/gm.exec(animeHtml)?.[2];
        const episodes = JSON.parse(/var episodes = (.+)\;/gm.exec(animeHtml)?.[1] as string).map((episode: any) => nekoEpisodetoEpisode(episode));

        return { ...anime, synopsis, banner_image_url, episodes };
    }
}
