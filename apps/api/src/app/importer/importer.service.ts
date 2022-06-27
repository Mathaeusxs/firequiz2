import { CategoriesService } from '@api/endpoints/categories/categories.service';
import { DisciplinesService } from '@api/endpoints/disciplines/disciplines.service';
import { QuestionsService } from '@api/endpoints/questions/questions.service';
import { QuizzesService } from '@api/endpoints/quizzes/quizzes.service';
import { Categorie, DefaultCategorie, DefaultDiscipline, DefaultQuestion, DefaultQuiz, Discipline, Question, Quiz } from '@libs/app-interfaces/data';
import { Injectable } from '@nestjs/common';

import { PionirjiPrvaPomoc } from './database/pionirji/prva_pomoc';
import { PionirjiPreventiva } from './database/pionirji/pozarna_preventiva';
import { PionirjiZgodovina } from './database/pionirji/zgodovina';

import { MladinciZgodovina } from './database/mladinci/zgodovina';
import { MladinciPrvaPomoc } from './database/mladinci/prva_pomoc';

import { PripravnikiZgodovina } from './database/pripravniki/zgodovina';

export interface QuestionImport {
  question: string,
  type: string,
  main_answer: string[],
  fake_answers: string[]
  points?: number
}

@Injectable()
export class ImporterService {

  private cats = {
    pi: null as Categorie,
    ml: null as Categorie,
    pri: null as Categorie
  }
  private disc = {
    pp: null as Discipline,
    ppre: null as Discipline,
    zg: null as Discipline
  }

  constructor(
    private categoriesService: CategoriesService,
    private disciplinesService: DisciplinesService,
    private quizzesService: QuizzesService,
    private questionService: QuestionsService
  ) {
  }

  async startImport() {
    await this.importCategories();
    await this.importDisciplines();
    await this.importQuizes();
  }

  private async importCategories() {
    this.cats.pi = await this.categoriesService.save({ ...DefaultCategorie, name: 'Pionirji' } as Categorie);
    this.cats.ml = await this.categoriesService.save({ ...DefaultCategorie, name: 'Mladinci' } as Categorie);
    this.cats.pri = await this.categoriesService.save({ ...DefaultCategorie, name: 'Pripravniki' } as Categorie);
  }

  private async importDisciplines() {
    this.disc.pp = await this.disciplinesService.save({ ...DefaultDiscipline, name: 'Prva Pomoč' } as Discipline);
    this.disc.ppre = await this.disciplinesService.save({ ...DefaultDiscipline, name: 'Požarna preventiva' } as Discipline);
    this.disc.zg = await this.disciplinesService.save({ ...DefaultDiscipline, name: 'Zgodovina gasilstva' } as Discipline);
  }

  private async importQuizes() {
    await this.createQuiz(this.cats.pi, this.disc.pp, PionirjiPreventiva)
    await this.createQuiz(this.cats.pi, this.disc.ppre, PionirjiPrvaPomoc)
    await this.createQuiz(this.cats.pi, this.disc.zg, PionirjiZgodovina)

    await this.createQuiz(this.cats.ml, this.disc.zg, [ ...PionirjiZgodovina, ...MladinciZgodovina ])
    await this.createQuiz(this.cats.ml, this.disc.pp, [ ...PionirjiPrvaPomoc, ...MladinciPrvaPomoc ])
    await this.createQuiz(this.cats.ml, this.disc.ppre, [ ...PionirjiPreventiva ])

    await this.createQuiz(this.cats.pri, this.disc.pp, [ ...PionirjiPrvaPomoc, ...MladinciPrvaPomoc ])
    await this.createQuiz(this.cats.pri, this.disc.zg, [ ...PionirjiZgodovina, ...MladinciZgodovina, ...PripravnikiZgodovina ])
  }

  private async createQuiz(cat: Categorie, dis: Discipline, data: QuestionImport[]) {
    const quiz = await this.quizzesService.save({
      ...DefaultQuiz,
      categoriesId: cat.id,
      disciplinesId: dis.id,
      name: cat.name + ' ' + dis.name
    } as Quiz)

    for(let question of data) {

      const answers = [];
      for(let ma of question.main_answer) {
        answers.push({ answer: ma, correct: true })
      }
      for(let ma of question.fake_answers) {
        answers.push({ answer: ma, correct: false })
      }

      await this.questionService.save({
        ...DefaultQuestion,
        quizId: quiz.id,
        question: question.question,
        points: 1,
        answers,
      } as Question)
    }
  }
}
