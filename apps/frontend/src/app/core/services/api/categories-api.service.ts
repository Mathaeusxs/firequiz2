import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiResponse, ApiEndpoints } from '@libs/app-interfaces/api';
import { Categorie } from '@libs/app-interfaces/data';

import { environment } from '@environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesApiService {
  private apiUrl = `${environment.api.url}/${ApiEndpoints.Categories}`;

  constructor(
    private http: HttpClient
  ) {}

  getAll(modUser = false) {
    return this.http.get<ApiResponse<Categorie[]>>(`${this.apiUrl}`, {
      params: {
        modUser
      }
    });
  }

  getById(id: string, modUser = false) {
    return this.http.get<ApiResponse<Categorie>>(`${this.apiUrl}/${id}`, {
      params: {
        modUser
      }
    });
  }

  create(data: Categorie) {
    return this.http.post<ApiResponse<Categorie>>(`${this.apiUrl}`, data);
  }

  update(data: Categorie) {
    return this.http.patch<ApiResponse<Categorie>>(`${this.apiUrl}/${data.id}`, data);
  }

  updateFull(data: Categorie) {
    return this.http.put<ApiResponse<Categorie>>(`${this.apiUrl}/${data.id}`, data);
  }

  remove(data: Categorie) {
    return this.http.delete<ApiResponse<Categorie>>(`${this.apiUrl}/${data.id}`);
  }
}

