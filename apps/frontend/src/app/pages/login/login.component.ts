import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { first, catchError } from 'rxjs/operators';

import { AuthService } from '@app/core/services/auth.service';
import { MainService } from '@app/core/services/main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  loading = false;
  returnUrl: string;
  errorMessage: null | string = null;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private mainService: MainService
  ) {}

  async ngOnInit() {
    this.form = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
    this.authService.logout();
    this.mainService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  formLogin() {
    if(this.form.invalid) return false;

    const values = this.form.value as { username: string, password: string };

    this.loading = true;
    this.errorMessage = null;
    this.authService.login(values.username, values.password).pipe(
      first(),
      catchError( (error: HttpErrorResponse) => {
        this.errorMessage = error?.error?.message || error?.message || error;
        if (error.status >= 500) {
          this.errorMessage = error.message
        }
        this.loading = false;
        return of(error);
      })
    ).subscribe(
      response => {
        console.warn(response);
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        if (response === true) {
          setTimeout(() => {
            this.loading = false;
            this.router.navigate(['/settings']);
            // this.router.navigate([this.returnUrl]);
          }, 500);
        }

      }
    )
    return true;
  }

}
