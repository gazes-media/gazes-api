import { Module } from '@nestjs/common';
import { AnimesController } from './animes.controller';
import { AnimesService } from './animes.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
    imports: [CacheModule.register()],
    controllers: [AnimesController],
    providers: [AnimesService],
})
export class AnimesModule {}
