
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DbAnswers, DbQuestions } from '@libs/app-entities';

import { AddModUserInterceptor } from '@api/guards/add-moduser.interceptor';

import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { DbQuestionsSubscriber } from './questions.subscribers';

@Module({
  imports: [
    TypeOrmModule.forFeature([DbQuestions, DbAnswers]),
  ],
  controllers: [
    QuestionsController,
  ],
  providers: [
    QuestionsService,
    AddModUserInterceptor,
    DbQuestionsSubscriber
  ],
  exports: [
    QuestionsService
  ]
})
export class QuestionsModule {}
