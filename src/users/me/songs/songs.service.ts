import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { type UpdateSongsDTO } from 'src/schemas/songs.schema';
import { updateData } from 'src/common/utils/update-data';

@Injectable()
export class SongsService {
  constructor(private prisma: PrismaService) {}

  async update(data: UpdateSongsDTO, userId: string) {
    await updateData({
      prisma: this.prisma,
      model: 'Songs',
      userId,
      data,
    });
    return { message: 'Songs updated successfully' };
  }
}
