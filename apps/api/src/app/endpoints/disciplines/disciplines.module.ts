
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DbDisciplines } from '@libs/api-interfaces/db-entities';

import { AddModUserInterceptor } from '@api/guards/add-moduser.interceptor';

import { DisciplinesController } from './disciplines.controller';
import { DisciplinesService } from './disciplines.service';
import { DbDisciplinesSubscriber } from './disciplines.subscribers';

@Module({
  imports: [
    TypeOrmModule.forFeature([DbDisciplines]),
  ],
  controllers: [
    DisciplinesController,
  ],
  providers: [
    DisciplinesService,
    AddModUserInterceptor,
    DbDisciplinesSubscriber
  ],
  exports: [
    DisciplinesService
  ]
})
export class DisciplinesModule {}
