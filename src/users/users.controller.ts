import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { type CreateUserDTO, createUserSchema } from 'src/schemas/user.schema';
import { ZodValidationPipe } from 'src/prisma/zod-pipe';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(FileInterceptor('profilePicture'))
  @Post()
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body(new ZodValidationPipe(createUserSchema)) body: CreateUserDTO,
  ) {
    return this.usersService.create(body, file);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.usersService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
