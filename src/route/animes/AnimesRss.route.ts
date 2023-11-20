import { HTTPMethods, RouteHandlerMethod } from "fastify";
import { Route } from "../Route";
import { AnimeStore } from "../../store/animes.store";

type RSSItem = {
    title: string;
    link: string;
    description: string;
    pubDate: string;
    image: string;
    lang: "vostfr" | "vf";
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
                link: `https://gazes.fr/anime/${id[1]}/episode/${AnimeStore.episodeToNumber(anime.episode)}`,
                description: `Episode ${AnimeStore.episodeToNumber(anime.episode)} de ${anime.title}`,
                pubDate: new Date(anime.timestamp * 1000).toUTCString(),
                image: anime.url_bg,
                lang: anime.lang,
            };
        });

        let rss = `<?xml version="1.0" encoding="UTF-8"?>
            <rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:atom="http://www.w3.org/2005/Atom">
        <channel>
            <atom:link href="https://api.gazes.fr/anime/animes/rss" rel="self" type="application/rss+xml" />
            <title>Gaze RSS Feed</title>
            <link>https://gazes.fr/</link>
            <description>Latest anime releases from Gazes</description>
            <language>fr-fr</language>
            <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
            <pubDate>${new Date().toUTCString()}</pubDate>
            <ttl>60</ttl>
            ${animesFiltered
                .map((anime) => {
                    return `<item>
                <guid>${anime.link}</guid>
                <title>${anime.title}</title>
                <link>${anime.link}</link>
                <lang>${anime.lang}</lang>
                <description>${anime.description}</description>
                <pubDate>${anime.pubDate}</pubDate>
                <media:thumbnail url="${anime.image}" width="300" height="300" xmlns:media="http://search.yahoo.com/mrss/" />
            </item>\n`;
                })
                .join("")}
        </channel>
    </rss>
        `;
        reply.header("Access-Control-Allow-Origin", "*");
        reply.header("Content-Type", "application/xml");
        reply.send(rss);
    };
}
