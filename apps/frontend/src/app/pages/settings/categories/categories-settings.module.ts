import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedMainModule } from '@app/shared/shared-main.module';
import { SharedMainPrimeNGModule } from '@app/shared/shared-primeng.module';

import { CategoriesComponent } from './categories.component';
import { CategoriesEditComponent } from './categories-edit/categories-edit.component';
import { CategoriesEditModule } from './categories-edit/categories-edit.module';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: CategoriesComponent },
      { path: 'edit', component: CategoriesEditComponent },
      {
        path: 'edit/:id',
        component: CategoriesEditComponent,
      }
    ]
  }
];

@NgModule({
  declarations: [
    CategoriesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedMainModule,
    SharedMainPrimeNGModule,
    CategoriesEditModule,
  ],
  providers: [
  ]
})

export class CategoriesSettingsModule { }
