import { Injectable } from '@angular/core';
import { DashboardApiService } from '@app/core/services/api';
import { Categorie, Discipline, Quiz } from '@libs/app-interfaces/data';
import { BehaviorSubject, firstValueFrom, map } from 'rxjs';

@Injectable()
export class DashboardService {

  categories: Categorie[] = [];
  disciplines: Discipline[] = [];
  quizzes: Quiz[] = [];

  loaded$ = new BehaviorSubject(false);

  constructor(
    private dashboardApiService: DashboardApiService
  ) {

  }

  async fetchStart() {
    // Categories
    this.categories = await firstValueFrom(
      this.dashboardApiService.getActiveCategories().pipe(
        map( resp => {
          if (resp.success) return resp.data;
          return []
        })
      )
    );

    // Disciplines
    this.disciplines = await firstValueFrom(
      this.dashboardApiService.getActiveDisciplines().pipe(
        map( resp => {
          if (resp.success) return resp.data;
          return []
        })
      )
    );

    // Quizzes
    this.quizzes = await firstValueFrom(
      this.dashboardApiService.getActiveQuizzes().pipe(
        map( resp => {
          if (resp.success) return resp.data;
          return []
        })
      )
    );

    this.loaded$.next(true);
  }

  getQuizQuestions(quiz: Quiz, num: number) {
    return this.dashboardApiService.getQuizQuestions(quiz.id, num);
  }

  getQuickQuizQuestions(cat: Categorie[], dis: Discipline[], num: number) {
    return this.dashboardApiService.getQuickQuizQuestions(cat.map(c => c.id), dis.map(d => d.id), num);
  }

}
