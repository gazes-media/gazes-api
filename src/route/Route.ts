import { HTTPMethods, RouteHandlerMethod } from "fastify";

// ceci est un
// test en plusieurs blocs
// pour uniquement
// essayer de commit une portion

export abstract class Route {
    public abstract url: string;
    public abstract method: HTTPMethods;
    public abstract handler: RouteHandlerMethod;
}

// portion du text
