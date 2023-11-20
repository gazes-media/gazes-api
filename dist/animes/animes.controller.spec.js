"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _animescontroller = require("./animes.controller");
const _animesservice = require("./animes.service");
const _cachemanager = require("@nestjs/cache-manager");
describe('AnimesController', ()=>{
    let controller;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            controllers: [
                _animescontroller.AnimesController
            ],
            providers: [
                _animesservice.AnimesService
            ],
            imports: [
                _cachemanager.CacheModule.register()
            ]
        }).compile();
        controller = module.get(_animescontroller.AnimesController);
    });
    it('should be defined', ()=>{
        expect(controller).toBeDefined();
    });
});
