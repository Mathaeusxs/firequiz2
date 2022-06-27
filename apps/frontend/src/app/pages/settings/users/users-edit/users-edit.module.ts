
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedMainModule } from '@app/shared/shared-main.module';
import { SharedMainPrimeNGModule } from '@app/shared/shared-primeng.module';

import { UsersEditComponent } from './users-edit.component';

@NgModule({
  declarations: [
    UsersEditComponent,
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
    UsersEditComponent
  ]
})

export class UsersEditModule { }
