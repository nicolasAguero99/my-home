import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDTO } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateUserDTO) {
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
      data,
    });

    return user;
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
