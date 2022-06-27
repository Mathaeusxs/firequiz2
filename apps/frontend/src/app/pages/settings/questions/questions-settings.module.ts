import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedMainModule } from '@app/shared/shared-main.module';
import { SharedMainPrimeNGModule } from '@app/shared/shared-primeng.module';

import { QuestionsComponent } from './questions.component';
import { QuestionsEditComponent } from './questions-edit/questions-edit.component';
import { QuestionsEditModule } from './questions-edit/questions-edit.module';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: QuestionsComponent },
      { path: 'edit', component: QuestionsEditComponent },
      {
        path: 'edit/:id',
        component: QuestionsEditComponent,
      }
    ]
  }
];

@NgModule({
  declarations: [
    QuestionsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedMainModule,
    SharedMainPrimeNGModule,
    QuestionsEditModule,
  ],
  providers: [
  ]
})

export class QuestionsSettingsModule { }
