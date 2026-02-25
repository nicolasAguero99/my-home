import { Controller, Body, Param, Put } from '@nestjs/common';
import { LinksService } from './links.service';
import { type UpdateLinkDTO, updateLinkSchema } from 'src/schemas/links.schema';
import { ZodValidationPipe } from 'src/prisma/zod-pipe';

@Controller('users/me/:userId/links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Put()
  update(
    @Body(new ZodValidationPipe(updateLinkSchema)) body: UpdateLinkDTO,
    @Param('userId') userId: string,
  ) {
    return this.linksService.update(body, userId);
  }
}
