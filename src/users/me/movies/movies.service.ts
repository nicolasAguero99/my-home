import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateMovieDTO, UpdateMovieDTO } from '../../../schemas/movies.schema';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateMovieDTO, userId: string) {
    try {
      const newMovies = await this.prisma.movies.createManyAndReturn({
        data: data.map((movie) => ({
          ...movie,
          userId,
        })),
      });
      return newMovies;
    } catch {
      throw new BadRequestException('Failed to create link');
    }
  }

  findAll() {
    return `This action returns all movies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  async update(userId: string, data: UpdateMovieDTO) {
    try {
      await this.prisma.$transaction(
        data.map((movie) =>
          this.prisma.movies.update({
            where: { id: movie.id, userId },
            data: movie,
          }),
        ),
      );
      return { message: 'Movies updated successfully' };
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to update movies');
    }
  }

  async remove(userId: string, data: string[]) {
    const result = await this.prisma.movies.deleteMany({
      where: {
        id: { in: data },
        userId,
      },
    });

    if (result.count === 0) {
      throw new BadRequestException('No movies were deleted');
    }

    return { message: 'Movies deleted successfully' };
  }
}
