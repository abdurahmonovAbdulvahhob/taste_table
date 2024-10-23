import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Response } from 'express';

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post("create")
  async create(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminService.create(createAdminDto,res);
  }

  @Get("get")
  findAll() {
    return this.adminService.findAll();
  }

  @Get("get/:id")
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(id);
  }

  @Patch("update/:id")
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @Delete("delete/:id")
  remove(@Param("id") id: string) {
    return this.adminService.remove(id);
  }
}
