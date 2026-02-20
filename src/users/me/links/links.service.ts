import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLinkDTO, UpdateLinkDTO } from 'src/schemas/links.schema';

@Injectable()
export class LinksService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateLinkDTO, userId: string) {
    try {
      const newLink = await this.prisma.links.createManyAndReturn({
        data: data.map((link) => ({
          ...link,
          userId,
        })),
      });
      return newLink;
    } catch {
      throw new BadRequestException('Failed to create link');
    }
  }

  findAll() {
    return `This action returns all links`;
  }

  findOne(id: number) {
    return `This action returns a #${id} link`;
  }

  async update(userId: string, data: UpdateLinkDTO) {
    try {
      await this.prisma.$transaction(
        data.map((link) =>
          this.prisma.links.update({
            where: { id: link.id, userId },
            data: link,
          }),
        ),
      );
      return { message: 'Links updated successfully' };
    } catch {
      throw new BadRequestException('Failed to update link');
    }
  }

  remove(id: number) {
    return `This action removes a #${id} link`;
  }
}
