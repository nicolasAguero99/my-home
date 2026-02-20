import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  BadRequestException,
  Patch,
} from '@nestjs/common';
import { LinksService } from './links.service';
import {
  createLinkSchema,
  type UpdateLinkDTO,
  type CreateLinkDTO,
  updateLinkSchema,
} from 'src/schemas/links.schema';
import { ZodValidationPipe } from 'src/prisma/zod-pipe';

@Controller('users/me/:userId/links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(createLinkSchema)) body: CreateLinkDTO,
    @Param('userId') userId: string,
  ) {
    if (userId == null) {
      throw new BadRequestException('User ID not provided');
    }
    return this.linksService.create(body, userId);
  }

  @Get()
  findAll() {
    return this.linksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.linksService.findOne(+id);
  }

  @Patch()
  update(
    @Param('userId') userId: string,
    @Body(new ZodValidationPipe(updateLinkSchema)) body: UpdateLinkDTO,
  ) {
    return this.linksService.update(userId, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linksService.remove(+id);
  }
}
