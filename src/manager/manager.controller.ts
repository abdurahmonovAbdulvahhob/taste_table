import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post('create')
  create(@Body() createManagerDto: CreateManagerDto) {
    return this.managerService.create(createManagerDto);
  }

  @Get('get')
  findAll() {
    return this.managerService.findAll();
  }

  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.managerService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.managerService.update(id, updateManagerDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.managerService.remove(id);
  }
}
