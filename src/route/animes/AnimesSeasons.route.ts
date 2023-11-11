import { Anime } from "../../interfaces/anime.interface";
import { HTTPMethods, RouteHandlerMethod } from "fastify";
import { Route } from "../Route";
import { AnimeStore, seasonal } from "../../store/animes.store";
import Fuse from "fuse.js";
import fs from "fs";

export class AnimesSeasonsRoute extends Route {
    public url = "/animes/seasons";
    public method: HTTPMethods = "GET";

    public handler: RouteHandlerMethod = (request, reply) => {
        // récupérer les possible queries
        let { title, id } = request.query as { title?: string; id?: string };
        let seasons = JSON.parse(fs.readFileSync("./saisons.json", "utf-8")) as seasonal[];
        if (seasons.length <= 0) {
            return reply.status(404).send({
                success: false,
                message: "La requête a été traitée avec succès, mais aucun contenu n'est disponible pour la réponse demandée.",
            });
        }
        if (title) {
            const fuse = new Fuse(seasons, {
                keys: ["title", "title_english", "title_romanji", "others"],
                includeScore: false,
            });

            seasons = fuse.search(title).map((a) => a.item);
        }

        if (id) {
            seasons = seasons.filter((a) => a.ids.includes(parseInt(id)));
        }

        if (seasons.length <= 0) {
            return reply.status(404).send({
                success: false,
                message: "La requête a été traitée avec succès, mais aucun contenu n'est disponible pour la réponse demandée.",
            });
        }

        return reply.send({
            success: true,
            data: seasons,
        });
    };
}
