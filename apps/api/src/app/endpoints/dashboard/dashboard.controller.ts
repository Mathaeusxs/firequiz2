import { Controller, Get, Param, Query, ValidationPipe } from '@nestjs/common';

import { ApiEndpoints } from '@libs/app-interfaces/api';

import { DashboardService } from './dashboard.service';

@Controller(ApiEndpoints.Dashboard)
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('quizzes')
  async activeQuizzes() {
    return await this.dashboardService.getActiveQuizzes();
  }
  @Get('categories')
  async activeCategories() {
    return await this.dashboardService.getActiveCategories();
  }
  @Get('disciplines')
  async activeDisciplines() {
    return await this.dashboardService.getActiveDisciplines();
  }

  @Get('quiz/:id/:num')
  async getQuizQuestions(
    @Param('id') id: number,
    @Param('num') num: number
  ) {
    return await this.dashboardService.getQuizQuestions(id, num);
  }

  @Get('quickquiz')
  async getQuickQuiz(
    @Query('num') num: number,
    @Query('cats', new ValidationPipe({ transform: true })) cats: number[],
    @Query('dis', new ValidationPipe({ transform: true })) dis: number[],
  ) {
    return await this.dashboardService.getQuickQuiz(cats, dis, num);
  }
}
