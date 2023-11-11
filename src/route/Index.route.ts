import { Route } from "./Route";
import { HTTPMethods, RouteHandlerMethod } from "fastify";

/* The IndexRoute class is a GET route handler for the root URL that sends a "testing" message. */
export class IndexRoute extends Route {
    public url = "/";
    public method: HTTPMethods = "GET";

    public handler: RouteHandlerMethod = (request, reply) => {
        reply.send({
            message: "testing",
        });
    };
}

export { AnimesRssRoute } from "./animes/AnimesRss.route";
export { AnimesRoute } from "./animes/Animes.route";
export { AnimeHighlightedRoute } from "./animes/AnimesHighlighted.route";
export { AnimesLatestRoute } from "./animes/AnimesLatest.route";
export { AnimesSeasonsRoute } from "./animes/AnimesSeasons.route";
export { AnimesIdRoute } from "./animes/AnimesId.route";
export { AnimesIdEpisodeRoute } from "./animes/AnimesIdEpisode.route";
export { UserHistoryRoute } from "./users/History.route";
export { UserAnimesRoute } from "./users/Anime.route";
export { UserFavorisRoute } from "./users/Favoris.route";
export { UserFavorisPostRoute } from "./users/FavorisPost.route";
export { UserFavorisDeleteRoute } from "./users/FavorisDelete.route";
export { UserAnimesDeleteRoute } from "./users/AnimeDelete.route";
export { AnimesTrends } from "./animes/AnimesTrends.route";
