import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

// import { PopoverModule } from 'ngx-bootstrap/popover';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
/* import { DashboardComponent } from './components/dashboard/dashboard.component';
import { QuestionComponent } from './components/question/question.component';
import { QuizComponent } from './components/quiz/quiz.component'; */
/* import { DatabaseService } from './services/database.service';
import { QuizService } from './services/quiz.service'; */
/* import { EndQuestionsComponent } from './components/end-questions/end-questions.component'; */
import { LoginComponent } from './pages/login/login.component';
import { TokenInterceptor } from './guards/token.interceptor';
import { ErrorInterceptor } from './guards/error.interceptor';
import { MainService } from './core/services/main.service';
import { MainTranslateService } from './core/services/translate-wrapper.service';
import { ToastService } from './core/services/toastr.service';
import { AuthService } from './core/services/auth.service';
import { TranslateLoadedGuard } from './guards/translate-loaded.guard';
import { AuthGuard } from './guards/auth.guard';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
/*     DashboardComponent,
    QuestionComponent,
    QuizComponent, */
/*     EndQuestionsComponent */
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),

    // PopoverModule.forRoot(),
  ],
  providers: [
    AuthService,
    MainService,
    MainTranslateService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    MessageService,
    ConfirmationService,
    ToastService,
    TranslateLoadedGuard,
    AuthGuard,
/*     DatabaseService,
    QuizService, */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
