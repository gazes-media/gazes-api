import { Test, TestingModule } from '@nestjs/testing';
import { AnimesService } from './animes.service';
import { CacheModule } from '@nestjs/cache-manager';
import { AnimeSchema } from './animes.type';
import e from 'express';

describe('AnimesService', () => {
    let service: AnimesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AnimesService],
            imports: [CacheModule.register()],
        }).compile();

        service = module.get<AnimesService>(AnimesService);
    });

    it('should return a non empty array', async () => {
        const animes = await service.getAnimes();
        expect(animes).toBeDefined();
        expect(animes).not.toHaveLength(0);
    });

    it('should return 25 animes', async () => {
        const animes = await service.getAnimes({ page: 1 });
        expect(animes).toBeDefined();
        expect(animes).not.toHaveLength(0);
        expect(animes).toHaveLength(25);
    });

    it('should return only animes that have action in their genres', async () => {
        const animes = await service.getAnimes({ genres: ['action'] });
        expect(animes).toBeDefined();
        expect(animes).not.toHaveLength(0);
        expect(animes.every((anime) => anime.genres.includes('action'))).toBe(true);
    });

    it('should return only animes that have a start_date_year of 2020', async () => {
        const animes = await service.getAnimes({ start_date_year: 2020 });
        expect(animes).toBeDefined();
        expect(animes).not.toHaveLength(0);
        expect(animes.every((anime) => anime.start_date_year == 2020)).toBe(true);
    });

    it('should return only animes that have a start_date_year of 2020, a genre of action and return only 25 animes', async () => {
        const animes = await service.getAnimes({ start_date_year: 2020, genres: ['action'], page: 1 });
        expect(animes).toBeDefined();
        expect(animes).not.toHaveLength(0);
        expect(animes.every((anime) => anime.start_date_year == 2020)).toBe(true);
        expect(animes.every((anime) => anime.genres.includes('action'))).toBe(true);
        expect(animes).toHaveLength(25);
    });

    it('should return a valid anime', async () => {
        const anime = await service.getAnime(1);
        expect(AnimeSchema.safeParse(anime).success).toBe(true);
    });
});
