import { HTTPMethods, RouteHandlerMethod } from "fastify";
import { Route } from "../Route";
import { AnimeStore } from "../../store/animes.store";

type RSSItem = {
    title: string;
    link: string;
    description: string;
    pubDate: string;
    image: string;
};

export class AnimesRssRoute extends Route {
    public url: string = "/animes/rss";
    public method: HTTPMethods = "GET";

    public handler: RouteHandlerMethod = (request, reply) => {
        let animesFiltered: RSSItem[] = AnimeStore.latest.map((anime) => {
            let regex = /\/anime\/info\/(\d+)-[\w-]+/;
            let id = anime.anime_url.match(regex);
            return {
                title: anime.title,
                link: `https://deril-fr.github.io/anime/${anime.lang}/${id[1]}/episode/${AnimeStore.episodeToNumber(anime.episode)}`,
                description: `Episode ${AnimeStore.episodeToNumber(anime.episode)} de ${anime.title}`,
                pubDate: new Date(anime.timestamp * 1000).toUTCString(),
                image: anime.url_bg,
            };
        });

        let rss = `<?xml version="1.0" encoding="UTF-8"?>
            <rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/">
        <channel>
            <title>Gaze RSS Feed</title>
            <link>https://deril-fr.github.io/</link>
            <description>Latest anime releases from Gaze</description>
            <language>fr-fr</language>
            <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
            <pubDate>${new Date().toUTCString()}</pubDate>
            <ttl>60</ttl>
            ${animesFiltered
                .map((anime) => {
                    return `<item>
                <title>${anime.title}</title>
                <link>${anime.link}</link>
                <description>${anime.description}</description>
                <pubDate>${anime.pubDate}</pubDate>
                <media:thumbnail url="${anime.image}" type="image/jpeg" medium="image" width="300" height="300" xmlns:media="http://search.yahoo.com/mrss/" />
            </item>\n`;
                })
                .join("")}
        </channel>
    </rss>
        `;
        reply.header("Access-Control-Allow-Origin", "*");
        reply.header("Content-Type", "text/xml");
        reply.send(rss);
    };
}
