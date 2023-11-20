"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AnimesController", {
    enumerable: true,
    get: function() {
        return AnimesController;
    }
});
const _common = require("@nestjs/common");
const _animesservice = require("./animes.service");
const _animestype = require("./animes.type");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let AnimesController = class AnimesController {
    findAll(page, genres, start_date_year, title) {
        page = parseInt(page);
        if (page && isNaN(page)) throw new _common.BadRequestException('page must be a number');
        start_date_year = parseInt(start_date_year);
        if (start_date_year && isNaN(start_date_year)) throw new _common.BadRequestException('year must be a number');
        genres = genres?.split(',').filter((genre)=>!genre.startsWith('!') && _animestype.AnimeGenre.safeParse(genre).success);
        const negativeGenres = genres?.split(',').filter((genre)=>genre.startsWith('!')).map((genre)=>genre.replace('!', '')).filter((genre)=>_animestype.AnimeGenre.safeParse(genre).success);
        title = title?.trim().toLowerCase();
        return this.animesService.getAnimes({
            page,
            start_date_year,
            genres,
            title,
            negativeGenres
        });
    }
    async findTrendingAnimes() {
        console.log('test');
        const animes = await this.animesService.getAnimesTrending();
        return animes;
    }
    findOne(id) {
        return this.animesService.getAnime(id);
    }
    async findEpisode(id, ep) {
        id = parseInt(id);
        if (id && isNaN(id)) throw new _common.BadRequestException('id must be a number');
        ep = parseInt(ep);
        if (ep && isNaN(ep)) throw new _common.BadRequestException('episode must be a number');
        const episode = await this.animesService.getAnimeEpisode({
            id,
            ep
        });
        if (!episode) throw new _common.NotFoundException(`anime with id ${id} doesn't have episode ${ep}`);
        return episode;
    }
    constructor(animesService){
        this.animesService = animesService;
    }
};
_ts_decorate([
    (0, _common.Get)(),
    _ts_param(0, (0, _common.Query)('page')),
    _ts_param(1, (0, _common.Query)('genres')),
    _ts_param(2, (0, _common.Query)('year')),
    _ts_param(3, (0, _common.Query)('title')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0,
        void 0,
        void 0,
        void 0
    ])
], AnimesController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)('trends'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], AnimesController.prototype, "findTrendingAnimes", null);
_ts_decorate([
    (0, _common.Get)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ])
], AnimesController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Get)(':id/:episode'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Param)('episode')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0,
        void 0
    ])
], AnimesController.prototype, "findEpisode", null);
AnimesController = _ts_decorate([
    (0, _common.Controller)('animes'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _animesservice.AnimesService === "undefined" ? Object : _animesservice.AnimesService
    ])
], AnimesController);
