import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiResponse, ApiEndpoints } from '@libs/app-interfaces/api';
import { Quiz } from '@libs/app-interfaces/data';

import { environment } from '@environment';

@Injectable({
  providedIn: 'root'
})
export class QuizsApiService {
  private apiUrl = `${environment.api.url}/${ApiEndpoints.Quizzes}`;

  constructor(
    private http: HttpClient
  ) {}

  getAll(modUser = false) {
    return this.http.get<ApiResponse<Quiz[]>>(`${this.apiUrl}`, {
      params: {
        modUser
      }
    });
  }

  getById(id: number, modUser = false) {
    return this.http.get<ApiResponse<Quiz>>(`${this.apiUrl}/${id}`, {
      params: {
        modUser
      }
    });
  }

  create(data: Quiz) {
    return this.http.post<ApiResponse<Quiz>>(`${this.apiUrl}`, data);
  }

  update(data: Quiz) {
    return this.http.patch<ApiResponse<Quiz>>(`${this.apiUrl}/${data.id}`, data);
  }

  updateFull(data: Quiz) {
    return this.http.put<ApiResponse<Quiz>>(`${this.apiUrl}/${data.id}`, data);
  }

  remove(data: Quiz) {
    return this.http.delete<ApiResponse<Quiz>>(`${this.apiUrl}/${data.id}`);
  }
}

