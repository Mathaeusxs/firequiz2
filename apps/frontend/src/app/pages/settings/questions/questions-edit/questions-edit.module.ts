
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedMainModule } from '@app/shared/shared-main.module';
import { SharedMainPrimeNGModule } from '@app/shared/shared-primeng.module';

import { QuestionsEditComponent } from './questions-edit.component';

@NgModule({
  declarations: [
    QuestionsEditComponent,
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
    QuestionsEditComponent
  ]
})

export class QuestionsEditModule { }
