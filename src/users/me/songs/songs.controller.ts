import { Controller, Put, ParseUUIDPipe, Body, Param } from '@nestjs/common';
import { SongsService } from './songs.service';
import {
  type UpdateSongsDTO,
  updateSongsSchema,
} from 'src/schemas/songs.schema';
import { ZodValidationPipe } from 'src/prisma/zod-pipe';

@Controller('users/me/:userId/songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Put()
  update(
    @Body(new ZodValidationPipe(updateSongsSchema)) body: UpdateSongsDTO,
    @Param('userId', new ParseUUIDPipe()) userId: string,
  ) {
    return this.songsService.update(body, userId);
  }
}
