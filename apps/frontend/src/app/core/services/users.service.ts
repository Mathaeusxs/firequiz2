import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { ApiResponse } from '@libs/app-interfaces/api';
import { User } from '@libs/app-interfaces/data';

import { environment } from '@environment';
import { ToastService } from './toastr.service';
import { MainTranslateService } from '@app/core/services/translate-wrapper.service';

@Injectable()
export class UsersService implements OnDestroy {
  private apiUrl = `${environment.api.url}`;
  private destroy$ = new Subject<void>();

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private MTService: MainTranslateService
  ) {}

  ngOnDestroy() {
    this.destroy$.next();
  }

  getAll() {
    return this.http.get<ApiResponse<User[]>>(`${this.apiUrl}/users`);
  }

  getById(id: number) {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/users/${id}`);
  }

  getByUsername(username:string){
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/users/username/${username}`);
  }

  private createApi(values: User) {
    return this.http.post<ApiResponse<User>>(`${this.apiUrl}/users`, values);
  }

  private updateApi(values: User) {
    return this.http.patch<ApiResponse<User>>(`${this.apiUrl}/users/${values.id}`, values);
  }

  private removeApi(values: User) {
    return this.http.delete<ApiResponse<User>>(`${this.apiUrl}/users/${values.id}`);
  }

  create(user: User) {
    return this.createApi(user).pipe(
      first(),
      map((response: ApiResponse<User>) => {
        if (response.success) {
          this.toastService.showSuccessToast({
            detail: this.MTService.text.users.form.messages.new
          });
          return true;
        } else { return false; }
      }),
    )
  }

  update(user: User) {
    return this.updateApi(user).pipe(
      first(),
      map((response: ApiResponse<User>) => {
        if (response.success) {
          this.toastService.showSuccessToast({
            detail: this.MTService.text.users.form.messages.edit
          });
          return true;
        } else { return false; }
      }),
    )
  }

  remove(user: User) {
    return this.removeApi(user).pipe(
      first(),
      map((response: ApiResponse<User>) => {
        if (response.success) {
          this.toastService.showWarningToast({
            detail: this.MTService.text.users.form.messages.delete
          });
          return true;
        } else { return false; }
      }),
    )
  }

}
