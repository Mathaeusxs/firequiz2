import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiResponse, ApiEndpoints } from '@libs/app-interfaces/api';
import { Discipline } from '@libs/app-interfaces/data';

import { environment } from '@environment';

@Injectable({
  providedIn: 'root'
})
export class DisciplinesApiService {
  private apiUrl = `${environment.api.url}/${ApiEndpoints.Disciplines}`;

  constructor(
    private http: HttpClient
  ) {}

  getAll(modUser = false) {
    return this.http.get<ApiResponse<Discipline[]>>(`${this.apiUrl}`, {
      params: {
        modUser
      }
    });
  }

  getById(id: string, modUser = false) {
    return this.http.get<ApiResponse<Discipline>>(`${this.apiUrl}/${id}`, {
      params: {
        modUser
      }
    });
  }

  create(data: Discipline) {
    return this.http.post<ApiResponse<Discipline>>(`${this.apiUrl}`, data);
  }

  update(data: Discipline) {
    return this.http.patch<ApiResponse<Discipline>>(`${this.apiUrl}/${data.id}`, data);
  }

  updateFull(data: Discipline) {
    return this.http.put<ApiResponse<Discipline>>(`${this.apiUrl}/${data.id}`, data);
  }

  remove(data: Discipline) {
    return this.http.delete<ApiResponse<Discipline>>(`${this.apiUrl}/${data.id}`);
  }
}

