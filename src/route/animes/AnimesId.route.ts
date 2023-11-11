import { HTTPMethods, RouteHandlerMethod } from "fastify";
import { Route } from "../Route";
import { AnimeStore } from "../../store/animes.store";

interface Params {
    lang: string;
    id: string;
}

/* Handle GET requests for anime data based on language and ID parameters. */
export class AnimesIdRoute extends Route {
    public url: string = "/animes/:id";
    public method: HTTPMethods = "GET";

    public handler: RouteHandlerMethod = async (request, reply) => {
        const { id } = request.params as Params;
        const anime = await AnimeStore.get(id, "vostfr");

        if (!anime) {
            return reply.status(404).send({
                success: false,
                message: "La requête a été traitée avec succès, mais aucun contenu n'est disponible pour la réponse demandée.",
            });
        }

        reply.status(200).send({
            success: true,
            data: anime,
        });
    };
}
