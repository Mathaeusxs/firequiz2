
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedMainModule } from '@app/shared/shared-main.module';
import { SharedMainPrimeNGModule } from '@app/shared/shared-primeng.module';

import { DisciplinesEditComponent } from './disciplines-edit.component';

@NgModule({
  declarations: [
    DisciplinesEditComponent,
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
    DisciplinesEditComponent
  ]
})

export class DisciplinesEditModule { }
