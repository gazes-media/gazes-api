import { HTTPMethods, RouteHandlerMethod } from "fastify";

export abstract class Route {
    public abstract url: string;
    public abstract method: HTTPMethods;
    public abstract handler: RouteHandlerMethod;
}
