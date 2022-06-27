
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedMainModule } from '@app/shared/shared-main.module';
import { SharedMainPrimeNGModule } from '@app/shared/shared-primeng.module';
import { UsersService } from '@app/core/services/users.service';

import { UsersComponent } from './users.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UsersEditModule } from './users-edit/users-edit.module';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: UsersComponent },
      { path: 'edit', component: UsersEditComponent },
      {
        path: 'edit/:id',
        component: UsersEditComponent,
        // canActivate: [UserEditProjectsGuard]
      }
    ]
  }
];

@NgModule({
  declarations: [
    UsersComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedMainModule,
    SharedMainPrimeNGModule,
    RouterModule.forChild(routes),
    UsersEditModule,
  ],
  providers: [
    UsersService,
  ]
})

export class UsersSettingsModule { }
