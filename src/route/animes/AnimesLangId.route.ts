import { HTTPMethods, RouteHandlerMethod } from "fastify";
import { Route } from "../Route";
import { AnimeStore } from "../../store/animes.store";

interface Params {
  lang: string;
  id: string;
}

/* Handle GET requests for anime data based on language and ID parameters. */
export class AnimesLangIdRoute extends Route {
  public url: string = "/animes/:lang/:id";
  public method: HTTPMethods = "GET";

  public handler: RouteHandlerMethod = async (request, reply) => {
    const { lang, id } = request.params as Params;

    if (lang !== "vf" && lang !== "vostfr") {
      reply.status(400).send({ error: "Invalid language parameter." });
      return;
    }

    const anime = await AnimeStore.get(id, lang);
    console.log(anime);
  };
}
