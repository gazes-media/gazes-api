"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animes = void 0;
const cheerio_1 = require("cheerio");
class Animes {
    /**
     * This method fetch animes in VF and VOSTFR and the result json into VF, VOSTFR.
     * Then it combines VF and VOSTFR into one array (all) and map it to add the language to the anime object.
     */
    static fetch() {
        return __awaiter(this, void 0, void 0, function* () {
            const VOSTFR_URL = 'https://neko.ketsuna.com/animes-search-vostfr.json';
            const VF_URL = 'https://neko.ketsuna.com/animes-search-vf.json';
            this.vostfr = yield (yield fetch(VOSTFR_URL)).json();
            this.vf = yield (yield fetch(VF_URL)).json();
            this.all = [
                ...this.vostfr.map((anime) => {
                    return Object.assign(Object.assign({}, anime), { lang: 'vostfr' });
                }),
                ...this.vf.map((anime) => {
                    return Object.assign(Object.assign({}, anime), { lang: 'vf' });
                }),
            ];
        });
    }
    /**
     * This function retrieves information about an anime by its ID and language, including its
     * synopsis, cover URL, and episodes.
     *
     * @param {number} id - The ID of the anime that we want to retrieve information for.
     * @param {'vf' | 'vostfr'} lang - A string parameter that specifies the language of the anime to
     * be retrieved. It can only be either 'vf' or 'vostfr'.
     * @returns an object that contains information about an anime, including its synopsis, cover URL,
     * and episodes. The object is created by finding the anime with the specified ID in either the
     * 'vf' or 'vostfr' language array, fetching the full HTML page for the anime from a website, and
     * parsing the relevant information from the HTML page.
     */
    static getAnimeById(id, lang) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            let anime = this[lang].find((anime) => anime.id == id);
            if (!anime)
                return false;
            let fullAnimeHtmlPage = yield (yield fetch('https://neko.ketsuna.com/' + anime.url)).text();
            const synopsis = (_a = /(<div class="synopsis">\n<p>\n)(.*)/gm.exec(fullAnimeHtmlPage)) === null || _a === void 0 ? void 0 : _a[2];
            const cover_url = (_b = /(<div id="head" style="background-image: url\()(.*)(\);)/gm.exec(fullAnimeHtmlPage)) === null || _b === void 0 ? void 0 : _b[2];
            const episodes = JSON.parse((_c = /var episodes = (.+)\;/gm.exec(fullAnimeHtmlPage)) === null || _c === void 0 ? void 0 : _c[1]);
            return Object.assign(Object.assign({}, anime), { synopsis, cover_url, episodes });
        });
    }
    /**
     * This function retrieves the m3u8 URL and subtitles for a given episode from a specific website.
     * @param {Episode} episode - The episode parameter is an object representing an anime episode,
     * which is used to fetch the m3u8 URL and subtitles for the episode.
     */
    static getEpisodeM3u8(episode) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const neko_data = yield (yield fetch('https://neko.ketsuna.com' + episode.url)).text();
            const pstream_url = (_a = /(\n(.*)video\[0] = ')(.*)(';)/gm.exec(neko_data)) === null || _a === void 0 ? void 0 : _a[3];
            const pstream_data = yield (yield fetch('https://proxy.ketsuna.com/?url=' + encodeURIComponent(pstream_url))).text();
            // extract base url from pstream_url to extract online the origine of the url. It's the base url of the video
            const baseurl = pstream_url.split('/').slice(0, 3).join('/');
            const loadedHTML = (0, cheerio_1.load)(pstream_data);
            // get every script tag in the page
            const scripts = loadedHTML('script');
            // Map every script tag to get online the src attribute
            const scriptsSrc = scripts.map((i, el) => loadedHTML(el).attr('src')).get();
            let m3u8_url = '', subtitlesvtt = [];
            for (const scriptSrc of scriptsSrc) {
                const pstream_script = yield (yield fetch('https://proxy.ketsuna.com/?url=' + encodeURIComponent(scriptSrc))).text();
                // check if the script contains the m3u8 url
                let m3u8_url_B64 = (_b = /e.parseJSON\(atob\(t\).slice\(2\)\)\}\(\"([^;]*)"\),/gm.exec(pstream_script)) === null || _b === void 0 ? void 0 : _b[1];
                if (m3u8_url_B64) {
                    console.log(m3u8_url_B64);
                    const b64 = JSON.parse(atob(m3u8_url_B64).slice(2));
                    const pstream = b64;
                    m3u8_url = Object.values(pstream).find((data) => {
                        // check if data is a string
                        if (typeof data === 'string') {
                            return data.startsWith('https://');
                        }
                    });
                    // check if the script contains the subtitles
                    subtitlesvtt = pstream.subtitlesvtt;
                    break;
                }
                else {
                    m3u8_url_B64 = (_c = /e.parseJSON\(n\)}\(\"([^;]*)"\),/gm.exec(pstream_script)) === null || _c === void 0 ? void 0 : _c[1];
                    if (m3u8_url_B64) {
                        console.log(m3u8_url_B64);
                        const b64 = JSON.parse(atob(m3u8_url_B64).slice(2));
                        const pstream = b64;
                        m3u8_url = Object.values(pstream).find((data) => {
                            // check if data is a string
                            if (typeof data === 'string') {
                                return data.startsWith('https://');
                            }
                        });
                        // check if the script contains the subtitles
                        subtitlesvtt = pstream.subtitlesvtt;
                        break;
                    }
                    else {
                        m3u8_url_B64 = (_d = /n=atob\("([^"]+)"/gm.exec(pstream_script)) === null || _d === void 0 ? void 0 : _d[1];
                        if (m3u8_url_B64) {
                            console.log(m3u8_url_B64);
                            const b64 = JSON.parse(atob(m3u8_url_B64)
                                .replace(/\|\|\|/, '')
                                .slice(29));
                            const pstream = b64;
                            m3u8_url = Object.values(pstream).find((data) => {
                                // check if data is a string
                                if (typeof data === 'string') {
                                    return data.startsWith('https://');
                                }
                            });
                            // check if the script contains the subtitles
                            subtitlesvtt = pstream.subtitlesvtt;
                            break;
                        }
                    }
                }
            }
            if (m3u8_url !== '') {
                return {
                    uri: m3u8_url,
                    subtitlesvtt: subtitlesvtt,
                    baseurl: baseurl,
                };
            }
            else {
                return false;
            }
        });
    }
}
Animes.all = [];
Animes.vf = [];
Animes.vostfr = [];
exports.Animes = Animes;
