import {
  Controller,
  // Get,
  Body,
  Param,
  Post,
  Patch,
  // Param,
  Delete,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import {
  createMovieSchema,
  type UpdateMovieDTO,
  updateMovieSchema,
  type CreateMovieDTO,
  type DeleteMovieDTO,
  deleteMovieSchema,
} from 'src/schemas/movies.schema';
import { ZodValidationPipe } from 'src/prisma/zod-pipe';
// import { CreateMovieDTO } from 'src/schemas/movies.schema';
// import { UpdateMovieDTO } from 'src/schemas/movies.schema';

@Controller('users/me/:userId/movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(createMovieSchema)) body: CreateMovieDTO,
    @Param('userId') userId: string,
  ) {
    return this.moviesService.create(body, userId);
  }

  // @Get()
  // findAll() {
  //   return this.moviesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.moviesService.findOne(+id);
  // }

  @Patch()
  update(
    @Param('userId') userId: string,
    @Body(new ZodValidationPipe(updateMovieSchema)) body: UpdateMovieDTO,
  ) {
    return this.moviesService.update(userId, body);
  }

  @Delete()
  remove(
    @Body(new ZodValidationPipe(deleteMovieSchema)) body: DeleteMovieDTO,
    @Param('userId') userId: string,
  ) {
    return this.moviesService.remove(userId, body);
  }
}
