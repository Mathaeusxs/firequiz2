import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '@app/core/services/auth.service';

import { ApiResponse } from '@libs/app-interfaces/api';
import { ToastService } from '@app/core/services/toastr.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
    // Do nothing
  }

  intercept(request: HttpRequest<ApiResponse>, next: HttpHandler): Observable<HttpEvent<ApiResponse>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.router.navigate(['/login']);
        // this.authService.logout();
      }

      if (err.error?.message &&
        typeof err.error?.message !== 'undefined') {
          this.toastService.showDangerToast({
            detail: err.error?.message,
            summary: `${err.error?.statusCode} - ${err.error?.error}`,
          });
        }

      // const error = err.error.message || err.statusText;
      return throwError(err);
    }))
  }
}

