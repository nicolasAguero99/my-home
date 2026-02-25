import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('UsersService', () => {
  let service: UsersService;

  const mockPrisma = {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const body = {
        username: 'nico',
        email: 'nico@example.com',
        password: '123456',
      };
      mockPrisma.user.create.mockResolvedValue(body);
      const result = await service.create(body);
      expect(result).toEqual(body);
      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: body,
      });
    });
  });
});
