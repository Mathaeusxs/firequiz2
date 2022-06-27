

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { SettingsComponent } from './settings.component';

import { SharedMainModule } from '@app/shared/shared-main.module';
import { SharedMainPrimeNGModule } from '@app/shared/shared-primeng.module';
import { ToastMainComponent } from './toast-component/toast.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'categories',
    pathMatch: 'full',
  },
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: 'categories',
        loadChildren: () => import('./categories/categories-settings.module').then(m => m.CategoriesSettingsModule)
      },
      {
        path: 'disciplines',
        loadChildren: () => import('./disciplines/disciplines-settings.module').then(m => m.DisciplinesSettingsModule)
      },
      {
        path: 'quizzes',
        loadChildren: () => import('./quizzes/quizzes-settings.module').then(m => m.QuizzesSettingsModule)
      },
      {
        path: 'questions',
        loadChildren: () => import('./questions/questions-settings.module').then(m => m.QuestionsSettingsModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users-settings.module').then(m => m.UsersSettingsModule)
      },
/*       {
        path: 'projects',
        loadChildren: () => import('./projects/projects-settings.module').then(m => m.ProjectsSettingsModule)
      },
      {
        path: 'devices',
        loadChildren: () => import('./devices/devices-settings.module').then(m => m.DevicesSettingsModule)
      },
      {
        path: 'kis-systems',
        loadChildren: () => import('./kis-systems/kis-systems-settings.module').then(m => m.KisSystemsSettingsModule)
      },
      {
        path: 'mqtt-sources',
        loadChildren: () => import('./mqtt-sources/mqtt-sources-settings.module').then(m => m.ProjectMqttSourcesSettingsModule)
      },
      {
        path: 'mqtt-commands',
        loadChildren: () => import('./mqtt-commands/mqtt-commands-settings.module').then(m => m.ProjectMqttCommandsSettingsModule)
      },
      {
        path: 'kis-data-defenitions',
        loadChildren: () => import('./kis-data-defenitions/kis-data-defenitions-settings.module').then(m => m.KisDataDefenitionsSettingsModule)
      },
      {
        path: 'kis-jobs',
        loadChildren: () => import('./kis-jobs/kis-jobs-settings.module').then(m => m.KisJobsSettingsModule)
      }, */
    ]
  }
];

@NgModule({
  declarations: [
    ToastMainComponent,
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedMainModule,
    ConfirmDialogModule,
    SharedMainPrimeNGModule
  ],
  providers: [
  ]
})

export class SettingsModule { }
