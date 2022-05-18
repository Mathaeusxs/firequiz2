import { Controller, Get, Param, Post, Body, Put, Delete, Patch, UseGuards, UseInterceptors, Query } from '@nestjs/common';
import { Categorie } from '@libs/api-interfaces/index';
import { ApiEndpoints } from '@libs/api-interfaces/api';

import { JwtAuthGuard } from '@api/shared/auth/guards/jwt-auth.guard';
import { AddModUserInterceptor } from '@api/guards/add-moduser.interceptor';

import { CategoriesService } from './categories.service';

@Controller(ApiEndpoints.Categories)
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private disciplinesService: CategoriesService) {}

  @Get()
  async getAll() {
    return await this.disciplinesService.getAll();
  }

  @Get(':id')
  async getSingle(
    @Param('id') id: number
  ) {
    return await this.disciplinesService.getSingleById(id);
  }

  @Get('modified/:id')
  async checkModified(
    @Param('id')id:number,
    @Query('modTime')temp:number
  ){
    const modTime=new Date();
    modTime.setTime(temp);
    return await this.disciplinesService.checkModified(id,modTime);
  }

  @Post()
  @UseInterceptors(AddModUserInterceptor)
  async create(
    @Body() data: Categorie,
  ) {
    return await this.disciplinesService.save(data);
  }

  @Put(':id')
  @UseInterceptors(AddModUserInterceptor)
  async update(
    @Param('id') id: number,
    @Body() data: Categorie,
  ) {
    return await this.disciplinesService.update(id, data);
  }

  @Patch(':id')
  @UseInterceptors(AddModUserInterceptor)
  async updatePartial(
    @Param('id') id: number,
    @Body() data: Categorie,
  ) {
    return await this.disciplinesService.updatePartial(id, data);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: number
  ) {
    return await this.disciplinesService.delete(id);
  }
}
