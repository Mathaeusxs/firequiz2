import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, switchMap, filter, take } from 'rxjs';

import { AuthService } from '@app/core/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private authService: AuthService
    ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authReq = request;
    const token = this.authService.getCurrentToken();

    if (token != null) {
      authReq = this.addTokenHeader(request, token);
    }

    return next.handle(authReq).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && !authReq.url.includes('auth/login') && error.status === 401) {
          return this.handle401Error(authReq, next);
        }
        return throwError(() => error);
      })
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const refreshToken = this.authService.getRefreshToken();

      if (refreshToken)
        return this.authService.refreshToken(refreshToken).pipe(
          switchMap((token: string | null) => {
            this.isRefreshing = false;
            this.refreshTokenSubject.next(token);
            return next.handle(this.addTokenHeader(request, token as string));
          }),
          catchError((err) => {
            this.isRefreshing = false;

            this.authService.logout();
            return throwError(() => new Error(err));
          })
        );
    }
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }
}

