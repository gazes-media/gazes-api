import { z } from 'zod';

export const AnimeEpisodeSchema = z.object({
    episode: z.number(),
    vf_video_url: z.string().optional(),
    vostfr_video_url: z.string().optional(),
    nekosama_url: z.string().optional(),
});

export type AnimeEpisode = z.infer<typeof AnimeEpisodeSchema>;

export const AnimeGenre = z.union([
    z.literal('action'),
    z.literal('aventure'),
    z.literal('bataille royale'),
    z.literal('c0m1die'),
    z.literal('cyberpunk'),
    z.literal('drame'),
    z.literal('ecchi'),
    z.literal('fantaisie'),
    z.literal('hentai'),
    z.literal('horreur'),
    z.literal('isekai'),
    z.literal('mafia'),
    z.literal('magie'),
    z.literal('mahou shoujo'),
    z.literal('mecha'),
    z.literal('militaire'),
    z.literal('musique'),
    z.literal('mystère'),
    z.literal('psychologique'),
    z.literal('romance'),
    z.literal('science-fiction'),
    z.literal('shoujo'),
    z.literal('shounen'),
    z.literal('slice of life'),
    z.literal('sports'),
    z.literal('surnaturel'),
    z.literal('thriller'),
    z.literal('yuri'),
]);

export const AnimeType = z.union([z.literal('tv'), z.literal('ova'), z.literal('special'), z.literal('movie')]);
export const AnimeSchema = z.object({
    id: z.number(),
    title_english: z.string(),
    title_romanji: z.string(),
    type: AnimeType,
    genres: z.array(AnimeGenre),
    status: z.union([z.literal('en cours'), z.literal('terminé')]),
    popularity: z.number(),
    cover_image_url: z.string(),
    start_date_year: z.number(),
    synopsis: z.string().optional(),
    episodes: z.array(AnimeEpisodeSchema).optional(),
    nekosama_url: z.string(),
    banner_image_url: z.string().optional(),
});

export type Anime = z.infer<typeof AnimeSchema>;

// ------------------------------------------------------------
// Nekosama types
// ------------------------------------------------------------

export const NekosamaAnimeEpisodeSchema = z.object({
    time: z.string(),
    episode: z.string(),
    num: z.number(),
    title: z.string(),
    url: z.string(),
    url_image: z.string(),
});

export type NekosamaAnimeEpisode = z.infer<typeof NekosamaAnimeEpisodeSchema>;

export const NekosamaAnimeGenre = z.union([
    z.literal('action'),
    z.literal('adventure'),
    z.literal('drama'),
    z.literal('fantasy'),
    z.literal('military'),
    z.literal('shounen'),
    z.literal('romance'),
    z.literal('supernatural'),
    z.literal('mafia'),
    z.literal('slice of life'),
    z.literal('psychological'),
    z.literal('sci-fi'),
    z.literal('thriller'),
    z.literal('comedy'),
    z.literal('yuri'),
    z.literal('sports'),
    z.literal('isekai'),
    z.literal('magic'),
    z.literal('horror'),
    z.literal('mystery'),
    z.literal('battle royale'),
    z.literal('cyberpunk'),
    z.literal('music'),
    z.literal('ecchi'),
    z.literal('shoujo'),
    z.literal('mecha'),
    z.literal('mahou shoujo'),
    z.literal('hentai'),
]);

export const NekosamaAnimeType = z.union([z.literal(''), z.literal('TV'), z.literal('m0v1e'), z.literal('ova'), z.literal('special'), z.literal('tv')]);
export const NekosamaAnimeStatus = z.union([z.literal('1'), z.literal('2')]);

export const NekosamaAnimeSchema = z.object({
    id: z.number(),
    title: z.string(),
    title_english: z.string(),
    title_romanji: z.string(),
    others: z.string(),
    type: NekosamaAnimeType,
    status: NekosamaAnimeStatus,
    popularity: z.number(),
    url: z.string(),
    genres: z.array(NekosamaAnimeGenre),
    url_image: z.string(),
    score: z.string(),
    start_date_year: z.string(),
    nb_eps: z.string(),
});

export type NekosamaAnime = z.infer<typeof NekosamaAnimeSchema>;

// ------------------------------------------------------------
// Utilities
// ------------------------------------------------------------

export function nekoGenreToGenre(genre: string): z.infer<typeof AnimeGenre> {
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

export function nekoTypeToType(type: string): z.infer<typeof AnimeType> {
    switch (type) {
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

export function nekoStatusToStatus(status: string): Anime['status'] {
    switch (status) {
        case '1':
            return 'en cours';
        case '2':
            return 'terminé';
        default:
            return 'en cours';
    }
}

export function nekoEpisodetoEpisode(nekoEpisode: NekosamaAnimeEpisode): AnimeEpisode {
    return {
        episode: nekoEpisode.num,
        nekosama_url: nekoEpisode.url,
    };
}

export function nekoAnimeToAnime(nekoAnime: NekosamaAnime): Anime {
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
        nekosama_url: nekoAnime.url,
    };
}
