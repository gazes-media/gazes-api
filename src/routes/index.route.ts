import { FastifyReply, FastifyRequest } from "fastify";
import { app } from "../server";

app.addRoute('/', (request: FastifyRequest, reply: FastifyReply) => {
    reply.send({message: 'hello world from another file'});
})