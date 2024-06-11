import { HTTPMethods, RouteHandlerMethod } from "fastify";
import { Route } from "../Route";
import { AnimeStore } from "../../store/animes.store";

export class AnimesLatestRoute extends Route {
    public url = "/animes/latest";
    public method: HTTPMethods = "GET";

    public handler: RouteHandlerMethod = (request, reply) => {
        // récupérer les possible queries

        let animes = AnimeStore.latest;

        return reply.send({
            success: true,
            data: animes.map(({ url_image, url_bg, ...rest}) => {
                return {
                    ...rest,
                    url_image: url_image,
                    url_bg: url_bg,
                };
            }),
        });
    };
}
