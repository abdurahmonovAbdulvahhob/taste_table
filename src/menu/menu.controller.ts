import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('create')
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get('get')
  findAll() {
    return this.menuService.findAll();
  }

  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(id, updateMenuDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(id);
  }
}
