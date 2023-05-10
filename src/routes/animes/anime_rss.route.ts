import { FastifyReply, FastifyRequest } from "fastify";
import { app } from "../../server";
import { Animes } from "../../store/animes.store";

app.addRoute('/animes', async (request: FastifyRequest, reply: FastifyReply) => {
    
});