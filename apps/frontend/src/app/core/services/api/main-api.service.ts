import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiResponse } from '@libs/app-interfaces/api';
import { User } from '@libs/app-interfaces/data';

import { environment } from '@environment';

@Injectable({
  providedIn: 'root'
})
export class MainApiService {
  private apiUrl = `${environment.api.url}`;

  constructor(
    private http: HttpClient
  ) {}

  getAuthUser() {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/auth/user`);
  }
}
