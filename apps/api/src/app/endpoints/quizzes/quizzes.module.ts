
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DbQuiz } from '@libs/api-interfaces/db-entities';

import { AddModUserInterceptor } from '@api/guards/add-moduser.interceptor';

import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { DbQuizzesSubscriber } from './quizzes.subscribers';

@Module({
  imports: [
    TypeOrmModule.forFeature([DbQuiz]),
  ],
  controllers: [
    QuizzesController,
  ],
  providers: [
    QuizzesService,
    AddModUserInterceptor,
    DbQuizzesSubscriber
  ],
  exports: [
    QuizzesService
  ]
})
export class QuizzesModule {}
