import { Anime } from '../interfaces/anime.interface'
import { Episode } from '../interfaces/episode.interface'
import { load } from 'cheerio'
import Subtitlesvtt from '../interfaces/subtitlesvtt.interface'
import { PstreamData } from '../interfaces/pstreamdata.interface'
import LastEpisodes from '../interfaces/latest.interface'

export class Animes {
    public static all: Anime[] = []
    public static vf: Anime[] = []
    public static vostfr: Anime[] = []
    public static latest: LastEpisodes[] = []

    /**
     * This method fetch animes in VF and VOSTFR and the result json into VF, VOSTFR.
     * Then it combines VF and VOSTFR into one array (all) and map it to add the language to the anime object.
     */
    public static async fetch() {
        const VOSTFR_URL = 'https://neko.ketsuna.com/animes-search-vostfr.json'
        const VF_URL = 'https://neko.ketsuna.com/animes-search-vf.json'

        this.vostfr = await (await fetch(VOSTFR_URL)).json()
        this.vf = await (await fetch(VF_URL)).json()

        this.all = [
            ...this.vostfr.map((anime) => {
                return { ...anime, lang: 'vostfr' } as Anime
            }),

            ...this.vf.map((anime) => {
                return { ...anime, lang: 'vf' } as Anime
            }),
        ]
    }

    /**
     * This function retrieves the latest episodes from a neko website.
     * it store them into the latest array.
     */
    public static async getLatestEpisodes() {
            const res = await fetch("https://neko.ketsuna.com")
            const data = await res.text();
            let lastEpisode: LastEpisodes[] = [];
            const parsedData = /var lastEpisodes = (.+)\;/gm.exec(data);
            if (parsedData) {
                lastEpisode = JSON.parse(parsedData[1]);
            }
            this.latest = lastEpisode;
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
    public static async getAnimeById(id: number, lang: 'vf' | 'vostfr') {
        let anime = this[lang].find((anime) => anime.id == id)
        if (!anime) return false

        let fullAnimeHtmlPage = await (await fetch('https://neko.ketsuna.com/' + anime.url)).text()

        const synopsis = /(<div class="synopsis">\n<p>\n)(.*)/gm.exec(fullAnimeHtmlPage)?.[2]
        const cover_url = /(<div id="head" style="background-image: url\()(.*)(\);)/gm.exec(fullAnimeHtmlPage)?.[2]
        const episodes = JSON.parse(/var episodes = (.+)\;/gm.exec(fullAnimeHtmlPage)?.[1] as string)

        return { ...anime, synopsis, cover_url, episodes } as Anime
    }

    /**
     * This function retrieves the m3u8 URL and subtitles for a given episode from a specific website.
     * @param {Episode} episode - The episode parameter is an object representing an anime episode,
     * which is used to fetch the m3u8 URL and subtitles for the episode.
     */
    public static async getEpisodeM3u8(episode: Episode) {
        const neko_data = await (await fetch('https://neko.ketsuna.com' + episode.url)).text()
        const pstream_url = /(\n(.*)video\[0] = ')(.*)(';)/gm.exec(neko_data)?.[3] as string
        const pstream_data = await (await fetch('https://proxy.ketsuna.com/?url=' + encodeURIComponent(pstream_url))).text()
        // extract base url from pstream_url to extract online the origine of the url. It's the base url of the video
        const baseurl = pstream_url.split('/').slice(0, 3).join('/')
        const loadedHTML = load(pstream_data)
        // get every script tag in the page
        const scripts = loadedHTML('script')
        // Map every script tag to get online the src attribute
        const scriptsSrc = scripts.map((i, el) => loadedHTML(el).attr('src')).get()
        let m3u8_url: string = '',
            subtitlesvtt: Subtitlesvtt[] = []
        for (const scriptSrc of scriptsSrc) {
            const pstream_script = await (await fetch('https://proxy.ketsuna.com/?url=' + encodeURIComponent(scriptSrc))).text()
            // check if the script contains the m3u8 url
            let m3u8_url_B64 = /e.parseJSON\(atob\(t\).slice\(2\)\)\}\(\"([^;]*)"\),/gm.exec(pstream_script)?.[1] as string
            if (m3u8_url_B64) {
                console.log(m3u8_url_B64)
                const b64 = JSON.parse(atob(m3u8_url_B64).slice(2))
                const pstream: PstreamData = b64
                m3u8_url = Object.values(pstream).find((data: any) => {
                    // check if data is a string
                    if (typeof data === 'string') {
                        return data.startsWith('https://')
                    }
                })
                // check if the script contains the subtitles
                subtitlesvtt = pstream.subtitlesvtt
                break
            } else {
                m3u8_url_B64 = /e.parseJSON\(n\)}\(\"([^;]*)"\),/gm.exec(pstream_script)?.[1] as string
                if (m3u8_url_B64) {
                    console.log(m3u8_url_B64)
                    const b64 = JSON.parse(atob(m3u8_url_B64).slice(2))
                    const pstream: PstreamData = b64
                    m3u8_url = Object.values(pstream).find((data: any) => {
                        // check if data is a string
                        if (typeof data === 'string') {
                            return data.startsWith('https://')
                        }
                    })
                    // check if the script contains the subtitles
                    subtitlesvtt = pstream.subtitlesvtt
                    break
                } else {
                    m3u8_url_B64 = /n=atob\("([^"]+)"/gm.exec(pstream_script)?.[1] as string
                    if (m3u8_url_B64) {
                        console.log(m3u8_url_B64)
                        const b64 = JSON.parse(
                            atob(m3u8_url_B64)
                                .replace(/\|\|\|/, '')
                                .slice(29)
                        )
                        const pstream: PstreamData = b64
                        m3u8_url = Object.values(pstream).find((data: any) => {
                            // check if data is a string
                            if (typeof data === 'string') {
                                return data.startsWith('https://')
                            }
                        })
                        // check if the script contains the subtitles
                        subtitlesvtt = pstream.subtitlesvtt
                        break
                    }
                }
            }
        }
        if (m3u8_url !== '') {
            return {
                uri: m3u8_url,
                subtitlesvtt: subtitlesvtt,
                baseurl: baseurl,
            }
        } else {
            return false
        }
    }
}
