import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('MoviesService', () => {
  let service: MoviesService;

  const mockPrisma = {
    movies: {
      createManyAndReturn: jest.fn(),
      update: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  describe('create', () => {
    it('should create a new movie', async () => {
      const body = [
        {
          title: 'Movie 1',
          image: 'https://www.google.com',
          link: 'https://www.google.com',
          order: 1,
        },
        {
          title: 'Movie 2',
          image: 'https://www.google.com',
          link: 'https://www.google.com',
          order: 2,
        },
      ];
      mockPrisma.movies.createManyAndReturn.mockResolvedValue(body);
      const result = await service.create(body, 'id-123');
      expect(result).toEqual(body);
      expect(mockPrisma.movies.createManyAndReturn).toHaveBeenCalledWith({
        data: body.map((movie) => ({
          ...movie,
          userId: 'id-123',
        })),
      });
    });
  });
  describe('update', () => {
    it('should update a movie', async () => {
      const body = [
        {
          id: 'movie-id-123',
          title: 'New Movie 1',
          image: 'https://www.google.com',
          order: 4,
        },
        {
          id: 'movie-id-456',
          image: 'https://www.new-movie.com',
          link: 'https://www.new-movie.com',
        },
      ];
      mockPrisma.$transaction.mockResolvedValueOnce({
        data: body.map((movie) => ({
          ...movie,
          userId: 'id-123',
        })),
      });
      const result = await service.update(body, 'id-123');
      expect(result).toEqual({ message: 'Movies updated successfully' });
    });
  });
});
