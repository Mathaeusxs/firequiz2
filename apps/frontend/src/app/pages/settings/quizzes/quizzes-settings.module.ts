import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedMainModule } from '@app/shared/shared-main.module';
import { SharedMainPrimeNGModule } from '@app/shared/shared-primeng.module';

import { QuizzesComponent } from './quizzes.component';
import { QuizzesEditComponent } from './quizzes-edit/quizzes-edit.component';
import { QuizzesEditModule } from './quizzes-edit/quizzes-edit.module';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: QuizzesComponent },
      { path: 'edit', component: QuizzesEditComponent },
      {
        path: 'edit/:id',
        component: QuizzesEditComponent,
      }
    ]
  }
];

@NgModule({
  declarations: [
    QuizzesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedMainModule,
    SharedMainPrimeNGModule,
    QuizzesEditModule,
  ],
  providers: [
  ]
})

export class QuizzesSettingsModule { }
