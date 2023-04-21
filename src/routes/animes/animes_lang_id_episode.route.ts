import { FastifyReply, FastifyRequest } from 'fastify'
import { app } from '../../server'
import { Animes } from '../../store/animes.store'

app.addRoute('/animes/:lang/:id/:episode', async (request: FastifyRequest, reply: FastifyReply) => {
    let lang = (request.params as { lang: string }).lang
    let id = parseInt((request.params as { id: string }).id)
    let episodeNb = parseInt((request.params as { episode: string }).episode)

    if (lang !== 'vf' && lang !== 'vostfr') {
        return reply.status(400).send({
            error: 'lang must be "vf" or "vostfr"!',
        })
    }

    if (isNaN(id)) {
        return reply.status(400).send({
            error: 'anime id must be a number!',
        })
    }

    if (isNaN(episodeNb)) {
        return reply.status(400).send({
            error: 'episode number must be a number!',
        })
    }

    let anime = await Animes.getAnimeById(id, lang)

    if (!anime) {
        return reply.status(404).send({
            error: 'anime not found!',
        })
    }

    let episode = anime.episodes?.[episodeNb - 1]
    if (!episode) {
        return reply.status(400).send({
            error: `episode ${episode} of ${anime.title} doesn't exists`,
        })
    }

    let m3u8 = await Animes.getEpisodeM3u8(episode)

    return reply.send({ ...episode, m3u8 })
})
