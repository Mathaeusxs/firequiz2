import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';

import { ApiResponse } from '@libs/app-interfaces/api';
import { User, UserLoginPayload } from '@libs/app-interfaces/data';

import { environment } from '@environment';

import { MainService } from './main.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.api.url}/auth`;

  constructor(
    private http: HttpClient,
    private mainService: MainService
    ) {
  }

  login(username: string, password: string) {
    return this.http.post<ApiResponse<UserLoginPayload>>(`${this.apiUrl}/login`, { username, password })
      .pipe(map(
        (response: ApiResponse<UserLoginPayload>) => {

          if (response.success) {
            const reponseData = response.data as UserLoginPayload;

            localStorage.setItem(environment.storage.user.localToken, reponseData.access_token);
            localStorage.setItem(environment.storage.user.localRefresh, reponseData.refresh_token);
            return true;
          }

          // store user details and jwt token in local storage to keep user logged in between page refreshes
          // this.currentUserSubject.next(user);

          return false;
      }));
  }

  getUser() {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/user`);
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      const token = localStorage.getItem(environment.storage.user.localToken);

      if (token) {

        const response = await firstValueFrom(this.getUser())

        if (!response || !response.success) return false;

        this.mainService.setUser(response.data as User);

        return true;
      }
    } catch {
      // Do nothing
    }

    localStorage.removeItem(environment.storage.user.localToken);
    return false;
  }

  logout() {
    const token = this.getRefreshToken();

    if (!token) return null;

    this.http.post<ApiResponse<boolean>>(`${this.apiUrl}/logout`, {},  {
      headers: {
        'useRefreshToken': 'true'
      }
    }).pipe(take(1)).toPromise();

    // Delete local storage
    localStorage.removeItem(environment.storage.user.localToken);
    localStorage.removeItem(environment.storage.user.localRefresh);

    return true;
  }

  getCurrentToken() {
    return localStorage.getItem(environment.storage.user.localToken);
  }

  getRefreshToken() {
    return localStorage.getItem(environment.storage.user.localRefresh);
  }

  refreshToken(refreshToken: string) {
    return this.http.post<ApiResponse<UserLoginPayload>>(`${this.apiUrl}/refresh`, {}, {
      headers: {
        'Authorization': `Bearer ${refreshToken}`
      }
    }).pipe(map(
      (response: ApiResponse<UserLoginPayload>) => {
        if (response.success) {
          const reponseData = response.data as UserLoginPayload;

          localStorage.setItem(environment.storage.user.localToken, reponseData.access_token);
          return reponseData.access_token
        }
        return null;
    }));
  }
}
