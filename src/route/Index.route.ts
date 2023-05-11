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
