import { FastifyReply, FastifyRequest } from "fastify";
import { app } from "../../server";
import { Animes } from "../../store/animes.store";

app.addRoute('/animes/:lang', async (request: FastifyRequest, reply: FastifyReply) => {
    let lang = (request.params as { lang: string }).lang; 
    
    if (lang !== "vf" && lang !== "vostfr") {
        reply.status(400).send({
            error: 'lang must be "vf" or "vostfr"!'
        })

        return;
    }

    reply.send(Animes[lang]);
});