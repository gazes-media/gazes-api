import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { Cache } from 'cache-manager';
import { Anime, NekosamaAnime, AnimeGenre, nekoAnimeToAnime, nekoEpisodetoEpisode } from './animes.type';
import { z } from 'zod';
import Fuse from 'fuse.js';

type getAnimesFields = {
    genres?: z.infer<typeof AnimeGenre>[];
    negativeGenres?: z.infer<typeof AnimeGenre>[];
    page?: number;
    start_date_year?: number;
    title?: string;
};

@Injectable()
export class AnimesService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    /**
     * Retrieves a list of anime based on specified filters.
     * @async
     * @param {getAnimesFields} [fields={}] - An object containing filter parameters.
     * @returns {Promise<Anime[]>} - A Promise resolving to an array of Anime objects.
     */
    async getAnimes({ genres, negativeGenres, page, start_date_year, title }: getAnimesFields = {}) {
        let nekoAnimes: NekosamaAnime[] = await this.cacheManager.get<NekosamaAnime[]>('animes');

        if (!nekoAnimes) {
            const { data }: { data: NekosamaAnime[] } = await axios.get('https://neko.ketsuna.com/animes-search-vostfr.json');
            nekoAnimes = data;
            await this.cacheManager.set('animes', nekoAnimes); // Cache fetched data for future use
        }

        let filteredAnimes = nekoAnimes.map(nekoAnimeToAnime);

        if (title) {
            const fuse = new Fuse(filteredAnimes, {
                keys: ['title_english', 'title_romanji', 'others'],
                includeScore: true,
            });
            filteredAnimes = fuse.search(title).map((r) => r.item);
        }

        if (genres) {
            filteredAnimes = filteredAnimes.filter((anime) => genres.every((genre) => anime.genres.includes(genre)));
        }

        if (negativeGenres) {
            filteredAnimes = filteredAnimes.filter((anime) => !negativeGenres.some((genre) => anime.genres.includes(genre)));
        }

        if (start_date_year) {
            filteredAnimes = filteredAnimes.filter((anime) => anime.start_date_year === start_date_year);
        }

        const pageSize = 25;
        const startIndex = ((page || 1) - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        return filteredAnimes.slice(startIndex, endIndex);
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
