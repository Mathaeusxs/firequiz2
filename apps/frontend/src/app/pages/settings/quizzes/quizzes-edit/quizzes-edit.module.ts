
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedMainModule } from '@app/shared/shared-main.module';
import { SharedMainPrimeNGModule } from '@app/shared/shared-primeng.module';

import { QuizzesEditComponent } from './quizzes-edit.component';

@NgModule({
  declarations: [
    QuizzesEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedMainModule,
    SharedMainPrimeNGModule,
  ],
  providers: [

  ],
  exports: [
    QuizzesEditComponent
  ]
})

export class QuizzesEditModule { }
