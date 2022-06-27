
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DbCategories } from '@libs/app-entities';

import { AddModUserInterceptor } from '@api/guards/add-moduser.interceptor';

import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { DbCategoriesSubscriber } from './categories.subscribers';

@Module({
  imports: [
    TypeOrmModule.forFeature([DbCategories]),
  ],
  controllers: [
    CategoriesController,
  ],
  providers: [
    CategoriesService,
    AddModUserInterceptor,
    DbCategoriesSubscriber
  ],
  exports: [
    CategoriesService
  ]
})
export class CategoriesModule {}
