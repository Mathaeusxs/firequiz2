import { Injectable } from '@nestjs/common';

import { DbQuestions } from '@libs/app-entities';

import { getRandomIndex, shuffleArray } from '@libs/app-interfaces/helper';

import { QuizzesService } from '../quizzes/quizzes.service';
import { CategoriesService } from '../categories/categories.service';
import { DisciplinesService } from '../disciplines/disciplines.service';
import { QuestionsService } from '../questions/questions.service';

@Injectable()
export class DashboardService {

  constructor(
    private quizzesService: QuizzesService,
    private categoriesService: CategoriesService,
    private disciplinesService: DisciplinesService,
    private questionService: QuestionsService,
  ) {
  }

  /** GET LIST / ITEM **/

  async getActiveQuizzes() {
    return await this.quizzesService.repository.find({
      where: { active: true }
    });
  }

  async getActiveCategories() {
    return await this.categoriesService.repository.find({
      where: { active: true }
    });
  }

  async getActiveDisciplines() {
    return await this.disciplinesService.repository.find({
      where: { active: true }
    });
  }

  async getQuizQuestions(quizId: number, num: number) {
    const allQuestions = await this.questionService.getAllQuiz([quizId]);
    return this.selectRandomAndShuffle(allQuestions, num)
  }

  async getQuickQuiz(cats: number[], dis: number[], num: number) {
    const allQuizzes = await this.getActiveQuizzes();
    const quizIds: number[] = [];

    for(let q of allQuizzes) {
      if (cats.includes(q.categoriesId) && dis.includes(q.disciplinesId)) quizIds.push(q.id)
    }

    const allQuestions = await this.questionService.getAllQuiz(quizIds);

    return this.selectRandomAndShuffle(allQuestions, num)
  }

  private selectRandomAndShuffle(allQuestions: DbQuestions[], num: number) {
    if (allQuestions.length < num) num = allQuestions.length;

    const response = [];

    while(response.length < num) {
      const index = getRandomIndex(allQuestions.length);
      const question = allQuestions[index];

      if (response.find(r => r.id === question.id)) continue;

      question.answers = shuffleArray(question.answers);
      response.push(question);
    }

    return shuffleArray(response);
  }

}
