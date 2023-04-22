import { FastifyReply, FastifyRequest } from 'fastify'
import { app } from '../../server'
import { Animes } from '../../store/animes.store'
import { access, constants, createReadStream, readFile, stat, statSync, unlink, unlinkSync } from 'fs'
import { execSync, spawn, spawnSync } from 'child_process'
import path from 'path'
import { Readable } from 'stream'

function waitForFileToExist(filePath: string, timeout = 5000, interval = 100) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now()

        const checkFile = () => {
            access(filePath, constants.F_OK, (err) => {
                if (!err) {
                    resolve(null)
                } else if (Date.now() - startTime >= timeout) {
                    reject(new Error(`Timeout waiting for file ${filePath} to exist`))
                } else {
                    setTimeout(checkFile, interval)
                }
            })
        }

        checkFile()
    })
}

app.addRoute('/animes/:lang/:id/:episode/download', async (request: FastifyRequest, reply: FastifyReply) => {
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

    if (!m3u8) {
        return reply.status(400).send({
            error: 'm3u8 for this episode not found',
        })
    }

    // convert m3u8 to mp4 and send it
    let animeTitle = anime.title
    let m3u8Uri = m3u8.uri
    let tempFilePath = `./tmp/${Date.now()}-${encodeURIComponent(animeTitle)}.mp4`

    await new Promise((resolve) => {
        const ffmpegProcess = spawn('ffmpeg', [
            '-y',
            '-i',
            `https://proxy.ketsuna.com/?url=${encodeURIComponent(m3u8Uri)}`,
            '-protocol_whitelist',
            'https,tls,file,tcp',
            '-bsf:a',
            'aac_adtstoasc',
            '-vcodec',
            'copy',
            tempFilePath,
        ])

        ffmpegProcess.on('spawn', () => {
            console.log('starting')
        })

        ffmpegProcess.on('exit', () => {
            reply
                .code(200)
                .header('Content-Type', 'video/mp4')
                .header('Content-Length', statSync(tempFilePath).size)
                .header('Accept-Ranges', 'bytes')
                .header('Content-Disposition', `attachment; filename=${path.basename(tempFilePath)}`)
                .send(createReadStream(tempFilePath))

            unlinkSync(tempFilePath)
        })
    })
})
