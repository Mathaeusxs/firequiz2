import { Controller, Get, Param, Post, Body, Put, Delete, Patch, UseGuards, UseInterceptors, Query, ParseBoolPipe } from '@nestjs/common';
import { Quiz } from '@libs/app-interfaces/data';
import { ApiEndpoints } from '@libs/app-interfaces/api';

import { JwtAuthGuard } from '@api/shared/auth/guards/jwt-auth.guard';
import { AddModUserInterceptor } from '@api/guards/add-moduser.interceptor';

import { QuizzesService } from './quizzes.service';

@Controller(ApiEndpoints.Quizzes)
export class QuizzesController {
  constructor(private disciplinesService: QuizzesService) {}

  @Get()
  async getAll(
    @Query('modUser', ParseBoolPipe) modUser: boolean,
  ) {
    return await this.disciplinesService.getAll(modUser);
  }

  @Get(':id')
  async getSingle(
    @Param('id') id: number,
    @Query('modUser', ParseBoolPipe) modUser: boolean
  ) {
    return await this.disciplinesService.getSingleById(id, modUser);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AddModUserInterceptor)
  async create(
    @Body() data: Quiz,
  ) {
    return await this.disciplinesService.save(data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AddModUserInterceptor)
  async update(
    @Param('id') id: number,
    @Body() data: Quiz,
  ) {
    return await this.disciplinesService.update(id, data);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AddModUserInterceptor)
  async updatePartial(
    @Param('id') id: number,
    @Body() data: Quiz,
  ) {
    return await this.disciplinesService.updatePartial(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(
    @Param('id') id: number
  ) {
    return await this.disciplinesService.delete(id);
  }
}
