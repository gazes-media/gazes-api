import { Route } from "./Route";
import { HTTPMethods, RouteHandlerMethod, RouteOptions } from "fastify";

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
export { AnimesIdRoute } from "./animes/AnimesId.route";
export { AnimesIdEpisodeRoute } from "./animes/AnimesIdEpisode.route";
export { AnimesLangIdEpisodeDownloadRoute } from "./animes/AnimesLangIdEpisodeDownload.route";
export { UserHistoryRoute } from "./users/History.route";
export { UserAnimesRoute } from "./users/Anime.route";