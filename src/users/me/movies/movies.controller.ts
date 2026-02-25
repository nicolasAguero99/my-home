import { Controller, Body, Param, Put, ParseUUIDPipe } from '@nestjs/common';
import { MoviesService } from './movies.service';
import {
  type UpdateMovieDTO,
  updateMovieSchema,
} from 'src/schemas/movies.schema';
import { ZodValidationPipe } from 'src/prisma/zod-pipe';

@Controller('users/me/:userId/movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Put()
  update(
    @Body(new ZodValidationPipe(updateMovieSchema)) body: UpdateMovieDTO,
    @Param('userId', new ParseUUIDPipe()) userId: string,
  ) {
    return this.moviesService.update(body, userId);
  }
}
