// import { Test, TestingModule } from '@nestjs/testing';
// import { UsersController } from './users.controller';
// import { UsersService } from './users.service';

// describe('UsersController', () => {
//   let controller: UsersController;

//   const mockUsersService = {
//     create: jest.fn(),
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [UsersController],
//       providers: [
//         UsersService,
//         {
//           provide: UsersService,
//           useValue: mockUsersService,
//         },
//       ],
//     }).compile();

//     controller = module.get<UsersController>(UsersController);
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   describe('create', () => {
//     it('should create a new user', async () => {
//       const body = {
//         username: 'nico',
//         email: 'nico@example.com',
//         password: '123456',
//       };
//       mockUsersService.create.mockResolvedValue(body);
//       const result = await controller.create(body);
//       expect(result).toEqual(body);
//       expect(mockUsersService.create).toHaveBeenCalledWith(body);
//     });
//   });
// });
