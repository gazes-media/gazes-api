import { HTTPMethods, RouteHandlerMethod } from "fastify";
import { Route } from "../Route";
import { AnimeStore } from "../../store/animes.store";

export class AnimesTrends extends Route {
    public url: string = "/animes/trends";
    public method: HTTPMethods = "GET";

    public handler: RouteHandlerMethod = (request, reply) => {
        let animes = AnimeStore.vostfr;

        animes = animes.filter((a) => a.status === "1");
        animes = animes.sort((a, b) => parseInt(b.score) - parseInt(a.score)).slice(0, animes.length / 2);
        animes = animes.sort((a, b) => parseInt(b.start_date_year) - parseInt(a.start_date_year)).slice(0, animes.length / 2);

        return animes;
    };
}
