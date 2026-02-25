import { Test, TestingModule } from '@nestjs/testing';
import { LinksService } from './links.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('LinksService', () => {
  let service: LinksService;

  const mockPrisma = {
    links: {
      create: jest.fn(),
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
        LinksService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<LinksService>(LinksService);
  });

  describe('create', () => {
    it('should create a new link', async () => {
      const body = [
        {
          title: 'Link 1',
          category: 'Category 1',
          url: 'https://www.google.com',
          order: 1,
        },
        {
          title: 'Link 2',
          category: 'Category 2',
          url: 'https://www.youtube.com',
          order: 2,
        },
      ];
      mockPrisma.links.createManyAndReturn.mockResolvedValue(body);
      const result = await service.create(body, 'id-123');
      expect(result).toEqual(body);
      expect(mockPrisma.links.createManyAndReturn).toHaveBeenCalledWith({
        data: body.map((link) => ({
          ...link,
          userId: 'id-123',
        })),
      });
    });
  });
  describe('update', () => {
    it('should update a link', async () => {
      const body = [
        {
          id: 'link-id-123',
          title: 'New Link 1',
          category: 'Category 1',
          order: 4,
        },
        {
          id: 'link-id-456',
          category: 'New Category 2',
          url: 'https://www.new-link.com',
        },
      ];
      mockPrisma.$transaction.mockResolvedValueOnce({
        data: body.map((link) => ({
          ...link,
          userId: 'id-123',
        })),
      });
      const result = await service.update(body, 'id-123');
      expect(result).toEqual({ message: 'Links updated successfully' });
    });
  });
});
