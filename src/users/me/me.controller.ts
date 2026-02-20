import { Controller, Get, Param } from '@nestjs/common';
import { MeService } from './me.service';

@Controller('me')
export class MeController {
  constructor(private readonly meService: MeService) {}

  // @Post()
  // create(@Body() createMeDto: CreateMeDto) {
  //   return this.meService.create(createMeDto);
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.meService.findOne(+id);
  }
}
