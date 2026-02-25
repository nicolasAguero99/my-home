import { Injectable } from '@nestjs/common';
import { updateData } from 'src/common/utils/update-data';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateLinkDTO } from 'src/schemas/links.schema';

@Injectable()
export class LinksService {
  constructor(private prisma: PrismaService) {}

  async update(data: UpdateLinkDTO, userId: string) {
    await updateData({
      prisma: this.prisma,
      model: 'Links',
      userId,
      data,
    });
    return { message: 'Links updated successfully' };
  }
}
