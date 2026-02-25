import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDTO } from 'src/schemas/user.schema';
import { ImageService } from 'src/common/image/image.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private imageService: ImageService,
  ) {}

  async create(data: CreateUserDTO, file: Express.Multer.File) {
    const dataToCreate = data;

    const { fileName, error: uploadError } =
      await this.imageService.uploadProfilePicture(file);

    if (!uploadError) dataToCreate.profilePicture = fileName ?? '';
    else dataToCreate.profilePicture = '';

    const isUserExist = await this.prisma.user.findUnique({
      where: { username: data.username },
    });

    const isEmailExist = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (isUserExist || isEmailExist) {
      throw new ConflictException('User or email already exists');
    }

    const user = await this.prisma.user.create({
      data: dataToCreate,
    });

    return {
      user,
      ...(uploadError && { warning: 'Profile picture not uploaded' }),
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
