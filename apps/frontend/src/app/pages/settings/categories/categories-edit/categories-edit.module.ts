
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedMainModule } from '@app/shared/shared-main.module';
import { SharedMainPrimeNGModule } from '@app/shared/shared-primeng.module';

import { CategoriesEditComponent } from './categories-edit.component';

@NgModule({
  declarations: [
    CategoriesEditComponent,
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
    CategoriesEditComponent
  ]
})

export class CategoriesEditModule { }
