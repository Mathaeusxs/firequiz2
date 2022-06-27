import { Module } from '@nestjs/common';
import * as moment from 'moment';

import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConnectionDetails } from 'apps/api/src/environments/db-info';
import { AllExceptionsFilter } from './guards/errors-filter';
import { TransformInterceptor } from './guards/transform.interceptor';

// import { WebsocketModule } from './websocket/websocket.module';
// import { WebsocketSendMessagesModule } from './websocket/websocket-send-messages.module';

import { AuthModule } from './shared/auth/auth.module';
import { UsersModule } from './endpoints/users/users.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DisciplinesModule } from './endpoints/disciplines/disciplines.module';
import { CategoriesModule } from './endpoints/categories/categories.module';
import { QuizzesModule } from './endpoints/quizzes/quizzes.module';
import { QuestionsModule } from './endpoints/questions/questions.module';
import { ImporterModule } from './importer/importer.module';
import { DashboardModule } from './endpoints/dashboard/dashboard.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(DbConnectionDetails),
    AuthModule,
    UsersModule,
    CategoriesModule,
    DisciplinesModule,
    QuizzesModule,
    QuestionsModule,
    ImporterModule,
    DashboardModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: 'MomentWrapper',
      useValue: moment
    },
  ],
})
export class AppModule {}
