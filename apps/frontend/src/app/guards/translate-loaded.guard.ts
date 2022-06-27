import { map } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { MainTranslateService } from '@app/core/services/translate-wrapper.service';

@Injectable()
export class TranslateLoadedGuard implements CanActivate {

  constructor(
    private mainTranslateService: MainTranslateService,
  ) {}

  private mybeFetch(loaded: string) {
    if (!loaded) {
      this.mainTranslateService.init();
    }
  }

  canActivate(): Observable<boolean> {
    return this.mainTranslateService.currentLang$.pipe(
      tap( (loaded) => this.mybeFetch(loaded)),
      filter(value => !!value),
      map( val => val?true:false)
    )
  }
}
