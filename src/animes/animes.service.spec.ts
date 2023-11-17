import { Test, TestingModule } from '@nestjs/testing';
import { AnimesService } from './animes.service';
import { CacheModule } from '@nestjs/cache-manager';
import { AnimeEpisodeSchema, AnimeSchema } from './animes.type';

describe('AnimesService', () => {
    let service: AnimesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AnimesService],
            imports: [CacheModule.register()],
        }).compile();

        service = module.get<AnimesService>(AnimesService);
    });

    describe('getAnimes', () => {
        it('should return a array of valid animes', async () => {
            const animes = await service.getAnimes();
            expect(animes).toBeDefined();
            expect(animes).not.toHaveLength(0);
            expect(animes.every((anime) => AnimeSchema.safeParse(anime).success));
        });

        // genres
        it('should return every animes should have the "action" genre', async () => {
            const animes = await service.getAnimes({ genres: ['action'] });
            expect(animes).toBeDefined();
            expect(animes).not.toHaveLength(0);
            expect(animes.every((anime) => AnimeSchema.safeParse(anime).success));
            expect(animes.every((anime) => anime.genres.includes('action')));
        });

        // negative genres
        it('should return every animes should have the "action" genre but not the "ecchi" genre', async () => {
            const animes = await service.getAnimes({ genres: ['action'], negativeGenres: ['ecchi'] });
            expect(animes).toBeDefined();
            expect(animes).not.toHaveLength(0);
            expect(animes.every((anime) => AnimeSchema.safeParse(anime).success));
            expect(animes.every((anime) => anime.genres.includes('action') && !anime.genres.includes('ecchi')));
        });

        // page
        it('should return a array of animes with a length of 25', async () => {
            const animes = await service.getAnimes({ page: 1 });
            expect(animes).toBeDefined();
            expect(animes).not.toHaveLength(0);
            expect(animes.every((anime) => AnimeSchema.safeParse(anime).success));
            expect(animes).toHaveLength(25);
        });

        // start date year
        it('should return animes where every anime have "2020" for start_date_year', async () => {
            const animes = await service.getAnimes({ start_date_year: 2020 });
            expect(animes).toBeDefined();
            expect(animes).not.toHaveLength(0);
            expect(animes.every((anime) => AnimeSchema.safeParse(anime).success));
            expect(animes.every((anime) => anime.start_date_year == 2020));
        });

        it('should return a array of anime matching the title', async () => {
            const animes = await service.getAnimes({ title: 'hunter x hunter' });
            expect(animes).toBeDefined();
            expect(animes).not.toHaveLength(0);
        });

        it('should return a empty array when no anime with specified title found', async () => {
            const animes = await service.getAnimes({ title: 'zdjqoijdzqoijdioqzjdoiqzjdopqjpzoidjqiopzdjpioqjziopdjqpozd' });
            expect(animes).toBeDefined();
            expect(animes).toHaveLength(0);
        });
    });

    describe('getAnime', () => {
        it('should return a valid anime with 1 as id and all the optionnal fields', async () => {
            const anime = await service.getAnime(1);
            expect(anime).toBeDefined();
            expect(AnimeSchema.safeParse(anime));
            expect(anime.synopsis).toBeDefined();
            expect(anime.banner_image_url).toBeDefined();
            expect(anime.id).toEqual(1);
        });

        it('should have valid episodes array with a length greater than 0', async () => {
            const anime = await service.getAnime(1);
            expect(anime.episodes).not.toHaveLength(0);
            expect(anime.episodes.every((episode) => AnimeEpisodeSchema.safeParse(episode).success));
        });
    });
});
