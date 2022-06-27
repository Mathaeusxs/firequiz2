import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedMainModule } from '@app/shared/shared-main.module';
import { SharedMainPrimeNGModule } from '@app/shared/shared-primeng.module';

import { DisciplinesComponent } from './disciplines.component';
import { DisciplinesEditComponent } from './disciplines-edit/disciplines-edit.component';
import { DisciplinesEditModule } from './disciplines-edit/disciplines-edit.module';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: DisciplinesComponent },
      { path: 'edit', component: DisciplinesEditComponent },
      {
        path: 'edit/:id',
        component: DisciplinesEditComponent,
      }
    ]
  }
];

@NgModule({
  declarations: [
    DisciplinesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedMainModule,
    SharedMainPrimeNGModule,
    DisciplinesEditModule,
  ],
  providers: [
  ]
})

export class DisciplinesSettingsModule { }
