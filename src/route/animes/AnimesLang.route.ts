import { HTTPMethods, RouteHandlerMethod } from "fastify";
import { Route } from "../Route";
import { AnimeStore } from "../../store/animes.store";

interface Params {
  lang: string;
}

/* Handle GET requests for anime data based on the language parameter. */
export class AnimesLangRoute extends Route {
  public url = "/animes/:lang";
  public method: HTTPMethods = "GET";

  public handler: RouteHandlerMethod = (request, reply) => {
    const { lang } = request.params as Params;

    if (!["vf", "vostfr"].includes(lang)) {
      reply.status(400).send({ error: "Invalid language parameter." });
      return;
    }

    reply.status(200).send(AnimeStore[lang]);
  };
}
