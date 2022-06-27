
import { Module } from '@nestjs/common';

import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { QuestionsModule } from '../questions/questions.module';
import { DisciplinesModule } from '../disciplines/disciplines.module';
import { CategoriesModule } from '../categories/categories.module';
import { QuizzesModule } from '../quizzes/quizzes.module';

@Module({
  imports: [
    QuizzesModule,
    QuestionsModule,
    DisciplinesModule,
    CategoriesModule
  ],
  controllers: [
    DashboardController,
  ],
  providers: [
    DashboardService,
  ],
  exports: [
    DashboardService
  ]
})
export class DashboardModule {}
