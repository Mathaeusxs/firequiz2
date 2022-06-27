import { Controller, Get, Param, Post, Body, Put, Delete, Patch, UseGuards, UseInterceptors, Query } from '@nestjs/common';
import { User, UserUpdate } from '@libs/app-interfaces/data';
import { ApiEndpoints } from '@libs/app-interfaces/api';

import { JwtAuthGuard } from '@api/shared/auth/guards/jwt-auth.guard';
import { AddModUserInterceptor } from '@api/guards/add-moduser.interceptor';

import { UsersService } from './users.service';


@Controller(ApiEndpoints.Users)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUser() {
    return await this.usersService.getAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getSingleUser(
    @Param('id') id: number
  ) {
    return await this.usersService.getSingleById(id);
  }

  @Get('username/:id')

  @UseGuards(JwtAuthGuard)
  async getSingleUserByUsername(
    @Param('id')id: string
  ){
    return await this.usersService.getSingleByUsername(id);
  }

  @Get('modified/:id')
  async checkModified(
    @Param('id')id:number,
    @Query('modTime')temp:number
  ){
    const modTime=new Date();
    modTime.setTime(temp);
    return await this.usersService.checkModified(id,modTime);
  }

  @Post()
  @UseInterceptors(AddModUserInterceptor)
  @UseGuards(JwtAuthGuard)
  async createUser(
    @Body() user: User,
  ) {
    return await this.usersService.save(user);
  }

  @Patch(':id')
  @UseInterceptors(AddModUserInterceptor)
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Param('id') id: number,
    @Body() user: UserUpdate,
  ) {
    return await this.usersService.update(id, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(
    @Param('id') id: number
  ) {
    return await this.usersService.delete(id);
  }

  @Post('checkStartUser')
  async checkStartUser(
  ) {
    return await this.usersService.createAdminIfNotExist();
  }
}
