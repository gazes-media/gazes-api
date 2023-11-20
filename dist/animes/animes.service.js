"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AnimesService", {
    enumerable: true,
    get: function() {
        return AnimesService;
    }
});
const _cachemanager = require("@nestjs/cache-manager");
const _common = require("@nestjs/common");
const _axios = /*#__PURE__*/ _interop_require_default(require("axios"));
const _cachemanager1 = require("cache-manager");
const _animestype = require("./animes.type");
const _fuse = /*#__PURE__*/ _interop_require_default(require("fuse.js"));
const _cheerio = require("cheerio");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let AnimesService = class AnimesService {
    /**
     * The function `getAnimes` retrieves a list of anime based on specified filters such as genres,
     * negative genres, page number, start date year, and title.
     * @param {getAnimesFields}  - - `genres`: An array of genres to filter the animes by. An anime
     * must have all the specified genres to be included in the result.
     * @returns a subset of filtered anime objects based on the provided filters and pagination
     * parameters.
     */ async getAnimes({ genres, status, negativeGenres, page, start_date_year, title, vf = false } = {}) {
        const { data: nekoAnimes } = await _axios.default.get(`https://neko.ketsuna.com/animes-search-${vf ? 'vf' : 'vostfr'}.json`);
        let filteredAnimes = nekoAnimes.map(_animestype.nekoAnimeToAnime);
        if (status) filteredAnimes = filteredAnimes.filter((a)=>a.status == status);
        if (title) {
            const fuse = new _fuse.default(filteredAnimes, {
                keys: [
                    'title_english',
                    'title_romanji',
                    'others'
                ]
            });
            filteredAnimes = fuse.search(title).map((r)=>r.item);
        }
        if (genres) filteredAnimes = filteredAnimes.filter((anime)=>genres.every((genre)=>anime.genres.includes(genre)));
        if (negativeGenres) filteredAnimes = filteredAnimes.filter((anime)=>genres.every((genre)=>!anime.genres.includes(genre)));
        if (start_date_year) filteredAnimes.filter((anime)=>anime.start_date_year == start_date_year);
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
     */ async getAnime(id, vf = false) {
        const animes = await this.getAnimes({
            vf
        });
        const anime = animes.find((a)=>a.id == id);
        if (!anime) return undefined;
        const { data: animeHtml } = await _axios.default.get(`https://neko.ketsuna.com/${anime.nekosama_url}`);
        const synopsis = /(<div class="synopsis">\n<p>\n)(.*)/gm.exec(animeHtml)?.[2];
        const banner_image_url = /(<div id="head" style="background-image: url\()(.*)(\);)/gm.exec(animeHtml)?.[2];
        const episodes = JSON.parse(/var episodes = (.+)\;/gm.exec(animeHtml)?.[1]).map((episode)=>(0, _animestype.nekoEpisodetoEpisode)(episode));
        return {
            ...anime,
            synopsis,
            banner_image_url,
            episodes
        };
    }
    async getAnimeEpisode({ id, ep }) {
        const anime = await this.getAnime(id);
        const animeVf = await this.getAnime(id, true);
        if (!anime) return undefined;
        const foundEpisode = anime.episodes.find((e)=>e.episode === ep);
        if (!foundEpisode) return undefined;
        foundEpisode.vostfr_video_url = await this.getEpisodeVideo({
            episode: foundEpisode
        });
        if (animeVf) {
            const vfEpisode = animeVf.episodes.find((e)=>e.episode === ep);
            if (vfEpisode) {
                foundEpisode.vf_video_url = await this.getEpisodeVideo({
                    episode: vfEpisode
                });
            }
        }
        return foundEpisode;
    }
    async getAnimesTrending() {
        let trends = await this.getAnimes({
            status: 'en cours'
        });
        trends = trends.sort((a, b)=>b.start_date_year - a.start_date_year).slice(0, trends.length / 2);
        trends = trends.sort((a, b)=>b.popularity - a.popularity).slice(0, trends.length / 2);
        return trends;
    }
    async getEpisodeVideo({ episode }) {
        const episodeUrl = 'https://neko.ketsuna.com' + episode.nekosama_url;
        const { data: nekoData } = await _axios.default.get(episodeUrl);
        const pstreamUrl = /(\n(.*)video\[0] = ')(.*)(';)/gm.exec(nekoData)?.[3];
        if (!pstreamUrl) return undefined;
        const { data: pstreamData } = await _axios.default.get(`https://proxy.ketsuna.com/?url=${encodeURIComponent(pstreamUrl)}`);
        const loadedHTML = (0, _cheerio.load)(pstreamData);
        const scripts = loadedHTML('script');
        const scriptsSrc = scripts.map((i, el)=>loadedHTML(el).attr('src')).get();
        let m3u8Url = '';
        for (const scriptSrc of scriptsSrc){
            if (scriptSrc.includes('cloudflare-static')) continue;
            const { data: pstreamScript } = await _axios.default.get(`https://proxy.ketsuna.com/?url=${encodeURIComponent(scriptSrc)}`);
            let m3u8UrlB64 = /e.parseJSON\(atob\(t\).slice\(2\)\)\}\(\"([^;]*)"\),/gm.exec(pstreamScript)?.[1];
            if (m3u8UrlB64) {
                const b64 = JSON.parse(atob(m3u8UrlB64).slice(2));
                const pstream = b64;
                m3u8Url = Object.values(pstream).find((data)=>typeof data === 'string' && data.includes('.m3u8'));
                break;
            } else {
                m3u8UrlB64 = /e.parseJSON\(n\)}\(\"([^;]*)"\),/gm.exec(pstreamScript)?.[1];
                if (m3u8UrlB64) {
                    const b64 = JSON.parse(atob(m3u8UrlB64).slice(2));
                    const pstream = b64;
                    m3u8Url = Object.values(pstream).find((data)=>typeof data === 'string' && data.includes('.m3u8'));
                    break;
                } else {
                    m3u8UrlB64 = /n=atob\("([^"]+)"/gm.exec(pstreamScript)?.[1];
                    if (m3u8UrlB64) {
                        const b64 = JSON.parse(atob(m3u8UrlB64).replace(/\|\|\|/, '').slice(29));
                        const pstream = b64;
                        m3u8Url = Object.values(pstream).find((data)=>typeof data === 'string' && data.includes('.m3u8'));
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
    constructor(cacheManager){
        this.cacheManager = cacheManager;
    }
};
AnimesService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Inject)(_cachemanager.CACHE_MANAGER)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _cachemanager1.Cache === "undefined" ? Object : _cachemanager1.Cache
    ])
], AnimesService);
