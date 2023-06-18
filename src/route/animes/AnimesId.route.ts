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

    const animeVostfr = await AnimeStore.get(id, "vostfr");
    const animeVf = await AnimeStore.get(id, "vf");
    if(!animeVostfr){
      reply.status(404).send({ error: "Anime not found." });
      return;
    }
    let response = {
      vostfr: animeVostfr,
    };
    if(animeVf){
      response["vf"] = animeVf;
    }
    reply.status(200).send(response);
  };
}
