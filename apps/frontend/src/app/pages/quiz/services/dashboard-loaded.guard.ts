import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { DashboardService } from './dashboard.service';

@Injectable()
export class DashboardLoadedGuard implements CanActivate {

  constructor(
    private dashbaordService: DashboardService,
  ) {}

  private mybeFetch(loaded: boolean) {
    if (!loaded) {
      this.dashbaordService.fetchStart();
    }
  }

  canActivate(): Observable<boolean> {
    return this.dashbaordService.loaded$.pipe(
      tap( (loaded) => this.mybeFetch(loaded)),
      filter(value => value === true)
    )
  }
}
