import { FastifyReply, FastifyRequest } from "fastify";

export abstract class Middleware {
    public abstract handle(request: FastifyRequest, reply: FastifyReply): Promise<void> | void;
}
