import { Module } from '@nestjs/common';
import { MeService } from './me.service';
import { MeController } from './me.controller';
import { LinksModule } from './links/links.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  controllers: [MeController],
  providers: [MeService],
  imports: [LinksModule, MoviesModule],
})
export class MeModule {}
