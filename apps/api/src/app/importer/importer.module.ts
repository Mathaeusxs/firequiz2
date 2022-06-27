
import { CategoriesModule } from '@api/endpoints/categories/categories.module';
import { DisciplinesModule } from '@api/endpoints/disciplines/disciplines.module';
import { QuestionsModule } from '@api/endpoints/questions/questions.module';
import { QuizzesModule } from '@api/endpoints/quizzes/quizzes.module';
import { Module } from '@nestjs/common';

import { ImporterController } from './importer.controller';
import { ImporterService } from './importer.service';

@Module({
  imports: [
    CategoriesModule,
    DisciplinesModule,
    QuizzesModule,
    QuestionsModule
  ],
  controllers: [
    ImporterController,
  ],
  providers: [
    ImporterService
  ],
  exports: [
    ImporterService
  ]
})
export class ImporterModule {}
