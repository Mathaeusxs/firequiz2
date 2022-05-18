
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DbQuestions } from '@libs/api-interfaces/db-entities';

import { AddModUserInterceptor } from '@api/guards/add-moduser.interceptor';

import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { DbQuestionsSubscriber } from './questions.subscribers';

@Module({
  imports: [
    TypeOrmModule.forFeature([DbQuestions]),
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
