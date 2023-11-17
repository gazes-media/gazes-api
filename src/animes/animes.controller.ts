import { BadRequestException, Controller, Get, Param, Query } from '@nestjs/common';
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
        console.log(id);
        return this.animesService.getAnime(id);
    }
}
