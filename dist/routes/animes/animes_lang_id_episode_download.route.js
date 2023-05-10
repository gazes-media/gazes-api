"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../server");
const animes_store_1 = require("../../store/animes.store");
const fs_1 = require("fs");
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
function waitForFileToExist(filePath, timeout = 5000, interval = 100) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        const checkFile = () => {
            (0, fs_1.access)(filePath, fs_1.constants.F_OK, (err) => {
                if (!err) {
                    resolve(null);
                }
                else if (Date.now() - startTime >= timeout) {
                    reject(new Error(`Timeout waiting for file ${filePath} to exist`));
                }
                else {
                    setTimeout(checkFile, interval);
                }
            });
        };
        checkFile();
    });
}
server_1.app.addRoute('/animes/:lang/:id/:episode/download', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let lang = request.params.lang;
    let id = parseInt(request.params.id);
    let episodeNb = parseInt(request.params.episode);
    if (lang !== 'vf' && lang !== 'vostfr') {
        return reply.status(400).send({
            error: 'lang must be "vf" or "vostfr"!',
        });
    }
    if (isNaN(id)) {
        return reply.status(400).send({
            error: 'anime id must be a number!',
        });
    }
    if (isNaN(episodeNb)) {
        return reply.status(400).send({
            error: 'episode number must be a number!',
        });
    }
    let anime = yield animes_store_1.Animes.getAnimeById(id, lang);
    if (!anime) {
        return reply.status(404).send({
            error: 'anime not found!',
        });
    }
    let episode = (_a = anime.episodes) === null || _a === void 0 ? void 0 : _a[episodeNb - 1];
    if (!episode) {
        return reply.status(400).send({
            error: `episode ${episode} of ${anime.title} doesn't exists`,
        });
    }
    let m3u8 = yield animes_store_1.Animes.getEpisodeM3u8(episode);
    if (!m3u8) {
        return reply.status(400).send({
            error: 'm3u8 for this episode not found',
        });
    }
    // convert m3u8 to mp4 and send it
    let animeTitle = anime.title;
    let m3u8Uri = m3u8.uri;
    let tempFilePath = `./${Date.now()}-${encodeURIComponent(animeTitle)}.mp4`;
    yield new Promise((resolve) => {
        const ffmpegProcess = (0, child_process_1.spawn)('ffmpeg', [
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
        ]);
        ffmpegProcess.on('spawn', () => {
            console.log('starting');
        });
        ffmpegProcess.on('exit', () => {
            reply
                .code(200)
                .header('Content-Type', 'video/mp4')
                .header('Content-Length', (0, fs_1.statSync)(tempFilePath).size)
                .header('Accept-Ranges', 'bytes')
                .header('Content-Disposition', `attachment; filename=${path_1.default.basename(tempFilePath)}`)
                .send((0, fs_1.createReadStream)(tempFilePath));
            (0, fs_1.unlinkSync)(tempFilePath);
        });
    });
}));
