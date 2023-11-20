import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { Cache } from 'cache-manager';
import { Anime, NekosamaAnime, AnimeGenre, nekoAnimeToAnime, nekoEpisodetoEpisode, AnimeEpisode } from './animes.type';
import { z } from 'zod';
import Fuse from 'fuse.js';
import { load } from 'cheerio';

type getAnimesFields = {
    genres?: z.infer<typeof AnimeGenre>[];
    negativeGenres?: z.infer<typeof AnimeGenre>[];
    page?: number;
    start_date_year?: number;
    title?: string;
    vf?: boolean;
    status?: 'en cours' | 'terminé';
};

@Injectable()
export class AnimesService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    /**
     * The function `getAnimes` retrieves a list of anime based on specified filters such as genres,
     * negative genres, page number, start date year, and title.
     * @param {getAnimesFields}  - - `genres`: An array of genres to filter the animes by. An anime
     * must have all the specified genres to be included in the result.
     * @returns a subset of filtered anime objects based on the provided filters and pagination
     * parameters.
     */
    async getAnimes({ genres, status, negativeGenres, page, start_date_year, title, vf = false }: getAnimesFields = {}): Promise<Anime[]> {
        const { data: nekoAnimes }: { data: NekosamaAnime[] } = await axios.get(`https://neko.ketsuna.com/animes-search-${vf ? 'vf' : 'vostfr'}.json`);
        let filteredAnimes = nekoAnimes.map(nekoAnimeToAnime);

        if (status) filteredAnimes = filteredAnimes.filter((a) => a.status == status);

        if (title) {
            const fuse = new Fuse(filteredAnimes, {
                keys: ['title_english', 'title_romanji', 'others'],
            });
            filteredAnimes = fuse.search(title).map((r) => r.item);
        }

        if (genres) filteredAnimes = filteredAnimes.filter((anime) => genres.every((genre) => anime.genres.includes(genre)));
        if (negativeGenres) filteredAnimes = filteredAnimes.filter((anime) => genres.every((genre) => !anime.genres.includes(genre)));
        if (start_date_year) filteredAnimes.filter((anime) => anime.start_date_year == start_date_year);

        if (page) {
            const pageSize = 25;
            const startIndex = page * pageSize;
            const endIndex = startIndex + pageSize;
            filteredAnimes = filteredAnimes.slice(startIndex, endIndex);
        }

        return filteredAnimes;
    }

    /**
     * The function `getAnime` retrieves information about an anime, including its synopsis, banner
     * image URL, and episodes, based on its ID.
     * @param {number} id - The `id` parameter is a number that represents the unique identifier of an
     * anime. It is used to retrieve a specific anime from a list of animes.
     * @returns The function `getAnime` returns a `Promise` that resolves to an `Anime` object or
     * `undefined`.
     */
    async getAnime(id: number, vf: boolean = false): Promise<Anime | undefined> {
        const animes = await this.getAnimes({ vf });
        const anime = animes.find((a) => a.id == id);

        if (!anime) return undefined;

        const { data: animeHtml } = await axios.get(`https://neko.ketsuna.com/${anime.nekosama_url}`);

        const synopsis = /(<div class="synopsis">\n<p>\n)(.*)/gm.exec(animeHtml)?.[2];
        const banner_image_url = /(<div id="head" style="background-image: url\()(.*)(\);)/gm.exec(animeHtml)?.[2];
        const episodes = JSON.parse(/var episodes = (.+)\;/gm.exec(animeHtml)?.[1] as string).map((episode: any) => nekoEpisodetoEpisode(episode));

        return { ...anime, synopsis, banner_image_url, episodes };
    }

    async getAnimeEpisode({ id, ep }: { id: number; ep: number }) {
        const anime = await this.getAnime(id);
        const animeVf = await this.getAnime(id, true);

        if (!anime) return undefined;

        const foundEpisode = anime.episodes.find((e) => e.episode === ep);
        if (!foundEpisode) return undefined;

        foundEpisode.vostfr_video_url = await this.getEpisodeVideo({ episode: foundEpisode });

        if (animeVf) {
            const vfEpisode = animeVf.episodes.find((e) => e.episode === ep);
            if (vfEpisode) {
                foundEpisode.vf_video_url = await this.getEpisodeVideo({ episode: vfEpisode });
            }
        }

        return foundEpisode;
    }

    async getAnimesTrending(): Promise<Anime[]> {
        let trends = await this.getAnimes({ status: 'en cours' });

        trends = trends.sort((a, b) => b.start_date_year - a.start_date_year).slice(0, trends.length / 2);
        trends = trends.sort((a, b) => b.popularity - a.popularity).slice(0, trends.length / 2);

        return trends;
    }

    async getEpisodeVideo({ episode }: { episode: AnimeEpisode }) {
        const episodeUrl = 'https://neko.ketsuna.com' + episode.nekosama_url;

        const { data: nekoData } = await axios.get<string>(episodeUrl);

        const pstreamUrl = /(\n(.*)video\[0] = ')(.*)(';)/gm.exec(nekoData)?.[3] as string;
        if (!pstreamUrl) return undefined;

        const { data: pstreamData } = await axios.get<string>(`https://proxy.ketsuna.com/?url=${encodeURIComponent(pstreamUrl)}`);
        const loadedHTML = load(pstreamData);
        const scripts = loadedHTML('script');
        const scriptsSrc = scripts.map((i, el) => loadedHTML(el).attr('src')).get();

        let m3u8Url: string = '';
        for (const scriptSrc of scriptsSrc) {
            if (scriptSrc.includes('cloudflare-static')) continue;
            const { data: pstreamScript } = await axios.get<string>(`https://proxy.ketsuna.com/?url=${encodeURIComponent(scriptSrc)}`);
            let m3u8UrlB64 = /e.parseJSON\(atob\(t\).slice\(2\)\)\}\(\"([^;]*)"\),/gm.exec(pstreamScript)?.[1] as string;
            if (m3u8UrlB64) {
                const b64 = JSON.parse(atob(m3u8UrlB64).slice(2));
                const pstream = b64;
                m3u8Url = Object.values(pstream).find((data: any) => typeof data === 'string' && data.includes('.m3u8')) as string;
                break;
            } else {
                m3u8UrlB64 = /e.parseJSON\(n\)}\(\"([^;]*)"\),/gm.exec(pstreamScript)?.[1] as string;
                if (m3u8UrlB64) {
                    const b64 = JSON.parse(atob(m3u8UrlB64).slice(2));
                    const pstream = b64;
                    m3u8Url = Object.values(pstream).find((data: any) => typeof data === 'string' && data.includes('.m3u8')) as string;
                    break;
                } else {
                    m3u8UrlB64 = /n=atob\("([^"]+)"/gm.exec(pstreamScript)?.[1] as string;
                    if (m3u8UrlB64) {
                        const b64 = JSON.parse(
                            atob(m3u8UrlB64)
                                .replace(/\|\|\|/, '')
                                .slice(29),
                        );
                        const pstream = b64;
                        m3u8Url = Object.values(pstream).find((data: any) => typeof data === 'string' && data.includes('.m3u8')) as string;
                        break;
                    }
                }
            }
        }
        if (m3u8Url !== '') {
            return 'https://proxy.ketsuna.com?url=' + encodeURIComponent(m3u8Url);
        } else {
            return undefined;
        }
    }
}
