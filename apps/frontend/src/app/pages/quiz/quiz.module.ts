import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedMainModule } from '@app/shared/shared-main.module';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { QuestionComponent } from './components/question/question.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { EndQuestionsComponent } from './components/end-questions/end-questions.component';
import { DashboardService } from './services/dashboard.service';
import { DashboardLoadedGuard } from './services/dashboard-loaded.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [DashboardLoadedGuard]
  }, {
    path: 'questions/:quizId/:num_questions/:countdown',
    component: QuizComponent,
  }, {
    path: 'questions/quick-quiz',
    component: QuizComponent,
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    QuestionComponent,
    QuizComponent,
    EndQuestionsComponent
  ],
  imports: [
    CommonModule,
    SharedMainModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    DashboardService,
    DashboardLoadedGuard
  ],
  bootstrap: []
})
export class MainQuizModule { }
