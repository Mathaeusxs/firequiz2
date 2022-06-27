import { first } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { PrimeNGConfig } from 'primeng/api';

import { TranslateText } from '@app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MainTranslateService {

  text: TranslateText;

  currentLang$ = new BehaviorSubject<string>(null);

  constructor(
    private translateService: TranslateService,
    private config: PrimeNGConfig
  ) {
    // Do nothing
  }

  init(lang = 'sl') {
    this.use(lang);
    this.translateService.onLangChange.subscribe(() => this.updateText(lang));
  }

  use(lang = 'sl') {
    this.translateService.use(lang);

    if (lang != 'en') {
      // Change lang for PrimeNG
      this.translateService.get('primeng').subscribe(res => this.config.setTranslation(res));
    }
  }

  private updateText(lang: string) {
    this.translateService.getTranslation(lang).pipe(
      first()
    ).subscribe(t => {
      this.text = t;
      this.currentLang$.next(lang);
    });
  }

  getTranslate(key: string, values: object) {
    return firstValueFrom(this.translateService.get(key, values));
  }
}
