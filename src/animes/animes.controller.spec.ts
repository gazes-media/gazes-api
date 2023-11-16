import { Test, TestingModule } from '@nestjs/testing';
import { AnimesController } from './animes.controller';
import { AnimesService } from './animes.service';
import { CacheModule } from '@nestjs/cache-manager';

describe('AnimesController', () => {
    let controller: AnimesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AnimesController],
            providers: [AnimesService],
            imports: [CacheModule.register()],
        }).compile();

        controller = module.get<AnimesController>(AnimesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
