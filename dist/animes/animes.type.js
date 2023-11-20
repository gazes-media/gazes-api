"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    AnimeEpisodeSchema: function() {
        return AnimeEpisodeSchema;
    },
    AnimeGenre: function() {
        return AnimeGenre;
    },
    AnimeSchema: function() {
        return AnimeSchema;
    },
    AnimeType: function() {
        return AnimeType;
    },
    NekosamaAnimeEpisodeSchema: function() {
        return NekosamaAnimeEpisodeSchema;
    },
    NekosamaAnimeGenre: function() {
        return NekosamaAnimeGenre;
    },
    NekosamaAnimeSchema: function() {
        return NekosamaAnimeSchema;
    },
    NekosamaAnimeStatus: function() {
        return NekosamaAnimeStatus;
    },
    NekosamaAnimeType: function() {
        return NekosamaAnimeType;
    },
    nekoAnimeToAnime: function() {
        return nekoAnimeToAnime;
    },
    nekoEpisodetoEpisode: function() {
        return nekoEpisodetoEpisode;
    },
    nekoGenreToGenre: function() {
        return nekoGenreToGenre;
    },
    nekoStatusToStatus: function() {
        return nekoStatusToStatus;
    },
    nekoTypeToType: function() {
        return nekoTypeToType;
    }
});
const _zod = require("zod");
const AnimeEpisodeSchema = _zod.z.object({
    episode: _zod.z.number(),
    vf_video_url: _zod.z.string().optional(),
    vostfr_video_url: _zod.z.string().optional(),
    nekosama_url: _zod.z.string().optional()
});
const AnimeGenre = _zod.z.union([
    _zod.z.literal('action'),
    _zod.z.literal('aventure'),
    _zod.z.literal('bataille royale'),
    _zod.z.literal('c0m1die'),
    _zod.z.literal('cyberpunk'),
    _zod.z.literal('drame'),
    _zod.z.literal('ecchi'),
    _zod.z.literal('fantaisie'),
    _zod.z.literal('hentai'),
    _zod.z.literal('horreur'),
    _zod.z.literal('isekai'),
    _zod.z.literal('mafia'),
    _zod.z.literal('magie'),
    _zod.z.literal('mahou shoujo'),
    _zod.z.literal('mecha'),
    _zod.z.literal('militaire'),
    _zod.z.literal('musique'),
    _zod.z.literal('mystère'),
    _zod.z.literal('psychologique'),
    _zod.z.literal('romance'),
    _zod.z.literal('science-fiction'),
    _zod.z.literal('shoujo'),
    _zod.z.literal('shounen'),
    _zod.z.literal('slice of life'),
    _zod.z.literal('sports'),
    _zod.z.literal('surnaturel'),
    _zod.z.literal('thriller'),
    _zod.z.literal('yuri')
]);
const AnimeType = _zod.z.union([
    _zod.z.literal('tv'),
    _zod.z.literal('ova'),
    _zod.z.literal('special'),
    _zod.z.literal('movie')
]);
const AnimeSchema = _zod.z.object({
    id: _zod.z.number(),
    title_english: _zod.z.string(),
    title_romanji: _zod.z.string(),
    type: AnimeType,
    genres: _zod.z.array(AnimeGenre),
    status: _zod.z.union([
        _zod.z.literal('en cours'),
        _zod.z.literal('terminé')
    ]),
    popularity: _zod.z.number(),
    cover_image_url: _zod.z.string(),
    start_date_year: _zod.z.number(),
    synopsis: _zod.z.string().optional(),
    episodes: _zod.z.array(AnimeEpisodeSchema).optional(),
    nekosama_url: _zod.z.string(),
    banner_image_url: _zod.z.string().optional()
});
const NekosamaAnimeEpisodeSchema = _zod.z.object({
    time: _zod.z.string(),
    episode: _zod.z.string(),
    num: _zod.z.number(),
    title: _zod.z.string(),
    url: _zod.z.string(),
    url_image: _zod.z.string()
});
const NekosamaAnimeGenre = _zod.z.union([
    _zod.z.literal('action'),
    _zod.z.literal('adventure'),
    _zod.z.literal('drama'),
    _zod.z.literal('fantasy'),
    _zod.z.literal('military'),
    _zod.z.literal('shounen'),
    _zod.z.literal('romance'),
    _zod.z.literal('supernatural'),
    _zod.z.literal('mafia'),
    _zod.z.literal('slice of life'),
    _zod.z.literal('psychological'),
    _zod.z.literal('sci-fi'),
    _zod.z.literal('thriller'),
    _zod.z.literal('comedy'),
    _zod.z.literal('yuri'),
    _zod.z.literal('sports'),
    _zod.z.literal('isekai'),
    _zod.z.literal('magic'),
    _zod.z.literal('horror'),
    _zod.z.literal('mystery'),
    _zod.z.literal('battle royale'),
    _zod.z.literal('cyberpunk'),
    _zod.z.literal('music'),
    _zod.z.literal('ecchi'),
    _zod.z.literal('shoujo'),
    _zod.z.literal('mecha'),
    _zod.z.literal('mahou shoujo'),
    _zod.z.literal('hentai')
]);
const NekosamaAnimeType = _zod.z.union([
    _zod.z.literal(''),
    _zod.z.literal('TV'),
    _zod.z.literal('m0v1e'),
    _zod.z.literal('ova'),
    _zod.z.literal('special'),
    _zod.z.literal('tv')
]);
const NekosamaAnimeStatus = _zod.z.union([
    _zod.z.literal('1'),
    _zod.z.literal('2')
]);
const NekosamaAnimeSchema = _zod.z.object({
    id: _zod.z.number(),
    title: _zod.z.string(),
    title_english: _zod.z.string(),
    title_romanji: _zod.z.string(),
    others: _zod.z.string(),
    type: NekosamaAnimeType,
    status: NekosamaAnimeStatus,
    popularity: _zod.z.number(),
    url: _zod.z.string(),
    genres: _zod.z.array(NekosamaAnimeGenre),
    url_image: _zod.z.string(),
    score: _zod.z.string(),
    start_date_year: _zod.z.string(),
    nb_eps: _zod.z.string()
});
function nekoGenreToGenre(genre) {
    const genres = new Map();
    genres.set('adventure', 'aventure');
    genres.set('battle royale', 'bataille royale');
    genres.set('comedy', 'c0m1die');
    genres.set('cyberpunk', 'cyberpunk');
    genres.set('drama', 'drame');
    genres.set('fantasy', 'fantaisie');
    genres.set('horror', 'horreur');
    genres.set('magic', 'magie');
    genres.set('military', 'militaire');
    genres.set('music', 'musique');
    genres.set('mystery', 'mystère');
    genres.set('psychological', 'psychologique');
    genres.set('sci-fi', 'science-fiction');
    genres.set('supernatural', 'surnaturel');
    genres.set('thriller', 'thriller');
    genres.set('c0m1dy', 'comédie');
    return genres.get(genre) || genre;
}
function nekoTypeToType(type) {
    switch(type){
        case 'TV':
            return 'tv';
        case 'm0v1e':
            return 'movie';
        case 'ova':
            return 'ova';
        case 'special':
            return 'special';
        case 'tv':
            return 'tv';
        default:
            return 'tv';
    }
}
function nekoStatusToStatus(status) {
    switch(status){
        case '1':
            return 'en cours';
        case '2':
            return 'terminé';
        default:
            return 'en cours';
    }
}
function nekoEpisodetoEpisode(nekoEpisode) {
    return {
        episode: nekoEpisode.num,
        nekosama_url: nekoEpisode.url
    };
}
function nekoAnimeToAnime(nekoAnime) {
    return {
        id: nekoAnime.id,
        title_english: nekoAnime.title_english?.toLowerCase(),
        title_romanji: nekoAnime.title_romanji?.toLowerCase(),
        type: nekoTypeToType(nekoAnime.type),
        genres: nekoAnime.genres.map(nekoGenreToGenre),
        status: nekoStatusToStatus(nekoAnime.status),
        popularity: nekoAnime.popularity,
        cover_image_url: nekoAnime.url_image,
        start_date_year: parseInt(nekoAnime.start_date_year),
        nekosama_url: nekoAnime.url
    };
}
