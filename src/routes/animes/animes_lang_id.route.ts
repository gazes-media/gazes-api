import { FastifyReply, FastifyRequest } from 'fastify'
import { app } from '../../server'
import { Animes } from '../../store/animes.store'

app.addRoute('/animes/:lang/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    let lang = (request.params as { lang: string }).lang
    let animeId = parseInt((request.params as { id: string }).id)

    if (lang !== 'vf' && lang !== 'vostfr') {
        return reply.status(400).send({
            error: 'lang must be "vf" or "vostfr"!',
        })
    }

    if (isNaN(animeId)) {
        return reply.status(400).send({
            error: 'anime id must be a number!',
        })
    }

    let anime = await Animes.getAnimeById(animeId, lang)

    if (!anime) {
        return reply.status(404).send({
            error: 'anime not found!',
        })
    }

    return anime
})
