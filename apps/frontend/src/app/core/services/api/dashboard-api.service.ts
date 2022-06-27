import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiResponse, ApiEndpoints } from '@libs/app-interfaces/api';
import { Categorie, Discipline, Question, Quiz } from '@libs/app-interfaces/data';

import { environment } from '@environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardApiService {
  private apiUrl = `${environment.api.url}/${ApiEndpoints.Dashboard}`;

  constructor(
    private http: HttpClient
  ) {}

  getActiveQuizzes() {
    return this.http.get<ApiResponse<Quiz[]>>(`${this.apiUrl}/quizzes`,);
  }

  getActiveCategories() {
    return this.http.get<ApiResponse<Categorie[]>>(`${this.apiUrl}/categories`,);
  }

  getActiveDisciplines() {
    return this.http.get<ApiResponse<Discipline[]>>(`${this.apiUrl}/disciplines`,);
  }

  getQuizQuestions(quizId: number, num: number) {
    return this.http.get<ApiResponse<Question[]>>(`${this.apiUrl}/quiz/${quizId}/${num}`,);
  }

  getQuickQuizQuestions(cats: number[], dis: number[], num: number) {
    return this.http.get<ApiResponse<Question[]>>(`${this.apiUrl}/quickquiz/`, {
      params: {
        num,
        cats: cats.toString(),
        dis: dis.toString()
      }
    });
  }
}

