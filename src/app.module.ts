import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimesModule } from './animes/animes.module';

@Module({
    imports: [AnimesModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
