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
const server_1 = require("../../server");
const animes_store_1 = require("../../store/animes.store");
server_1.app.addRoute('/animes/rss', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    let animesFiltered = animes_store_1.Animes.latest.map((anime) => {
        var _a;
        return {
            title: anime.title,
            link: `https://deril-fr.github.io/anime/${anime.lang}/${(_a = animes_store_1.Animes.all.find((a) => a.title === anime.title)) === null || _a === void 0 ? void 0 : _a.id}/episode/${animes_store_1.Animes.convertEpisodeToNumber(anime.episode)}`,
            description: `Episode ${animes_store_1.Animes.convertEpisodeToNumber(anime.episode)} de ${anime.title}`,
            pubDate: new Date(anime.timestamp * 1000).toUTCString(),
            image: anime.url_image
        };
    });
    let rss = `
    <?xml version="1.0" encoding="UTF-8"?>
        <rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/">
    <channel>
        <title>Gaze RSS Feed</title>
        <link>https://deril-fr.github.io/</link>
        <description>Latest anime releases from Gaze</description>
        <language>fr-fr</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <pubDate>${new Date().toUTCString()}</pubDate>
        <ttl>60</ttl>
        ${animesFiltered.map((anime) => {
        return `<item>
            <title>${anime.title}</title>
            <link>${anime.link}</link>
            <description>${anime.description}</description>
            <pubDate>${anime.pubDate}</pubDate>
            <media:thumbnail url="${anime.image}" type="image/jpeg" medium="image" width="300" height="300" xmlns:media="http://search.yahoo.com/mrss/" />
        </item>\n`;
    }).join('')}
    </channel>
</rss>
    `;
    reply.header('Access-Control-Allow-Origin', '*');
    reply.header('Content-Type', 'text/xml');
    reply.send(rss);
}));
