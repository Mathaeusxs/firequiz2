import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiResponse, ApiEndpoints } from '@libs/app-interfaces/api';
import { Question } from '@libs/app-interfaces/data';

import { environment } from '@environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionsApiService {
  private apiUrl = `${environment.api.url}/${ApiEndpoints.Questions}`;

  constructor(
    private http: HttpClient
  ) {}

  getAll(modUser = false) {
    return this.http.get<ApiResponse<Question[]>>(`${this.apiUrl}`, {
      params: {
        modUser
      }
    });
  }

  getById(id: string, modUser = false) {
    return this.http.get<ApiResponse<Question>>(`${this.apiUrl}/${id}`, {
      params: {
        modUser
      }
    });
  }

  create(data: Question) {
    return this.http.post<ApiResponse<Question>>(`${this.apiUrl}`, data);
  }

  update(data: Question) {
    return this.http.patch<ApiResponse<Question>>(`${this.apiUrl}/${data.id}`, data);
  }

  updateFull(data: Question) {
    return this.http.put<ApiResponse<Question>>(`${this.apiUrl}/${data.id}`, data);
  }

  remove(data: Question) {
    return this.http.delete<ApiResponse<Question>>(`${this.apiUrl}/${data.id}`);
  }
}

