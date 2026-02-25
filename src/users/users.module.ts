import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SongsModule } from './me/songs/songs.module';
import { MoviesModule } from './me/movies/movies.module';
import { LinksModule } from './me/links/links.module';
import { ImageModule } from 'src/common/image/image.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PrismaModule, SongsModule, MoviesModule, LinksModule, ImageModule],
})
export class UsersModule {}
