import { BadRequestException, Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
import { AnimesService } from './animes.service';
import { AnimeGenre } from './animes.type';

@Controller('animes')
export class AnimesController {
    constructor(private readonly animesService: AnimesService) {}

    @Get()
    findAll(@Query('page') page, @Query('genres') genres, @Query('year') start_date_year, @Query('title') title) {
        page = parseInt(page);
        if (page && isNaN(page)) throw new BadRequestException('page must be a number');

        start_date_year = parseInt(start_date_year);
        if (start_date_year && isNaN(start_date_year)) throw new BadRequestException('year must be a number');

        genres = genres?.split(',').filter((genre) => !genre.startsWith('!') && AnimeGenre.safeParse(genre).success);
        const negativeGenres = genres
            ?.split(',')
            .filter((genre) => genre.startsWith('!'))
            .map((genre) => genre.replace('!', ''))
            .filter((genre) => AnimeGenre.safeParse(genre).success);

        title = title?.trim().toLowerCase();

        return this.animesService.getAnimes({ page, start_date_year, genres, title, negativeGenres });
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.animesService.getAnime(id);
    }

    @Get(':id/:episode')
    async findEpisode(@Param('id') id, @Param('episode') ep) {
        id = parseInt(id);
        if (id && isNaN(id)) throw new BadRequestException('id must be a number');

        ep = parseInt(ep);
        if (ep && isNaN(ep)) throw new BadRequestException('episode must be a number');

        const episode = await this.animesService.getAnimeEpisode({ id, ep });
        if (!episode) throw new NotFoundException(`anime with id ${id} doesn't have episode ${ep}`);

        return episode;
    }
}
