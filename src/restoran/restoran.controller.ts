import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RestoranService } from './restoran.service';
import { CreateRestoranDto } from './dto/create-restoran.dto';
import { UpdateRestoranDto } from './dto/update-restoran.dto';

@Controller('restoran')
export class RestoranController {
  constructor(private readonly restoranService: RestoranService) {}

  @Post('create')
  create(@Body() createRestoranDto: CreateRestoranDto) {
    return this.restoranService.create(createRestoranDto);
  }

  @Get('get')
  findAll() {
    return this.restoranService.findAll();
  }

  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.restoranService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateRestoranDto: UpdateRestoranDto) {
    return this.restoranService.update(id, updateRestoranDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.restoranService.remove(id);
  }
}
