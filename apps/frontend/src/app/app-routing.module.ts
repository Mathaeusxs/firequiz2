import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { TranslateLoadedGuard } from './guards/translate-loaded.guard';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/quiz/dashboard',
    pathMatch: 'full',
  }, {
    path: 'quiz',
    loadChildren: () => import('./pages/quiz/quiz.module').then(m => m.MainQuizModule),
    canActivate: [ TranslateLoadedGuard ],
  }, {
    path: 'login',
    component: LoginComponent,
    canActivate: [ TranslateLoadedGuard ],
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule),
    canActivate: [ AuthGuard, TranslateLoadedGuard ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
