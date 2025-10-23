import { inject, Injectable, signal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  #translocoService = inject(TranslocoService);
  locale = signal<'FR' | 'EUS'>('FR');

  constructor() {
    const locale = localStorage.getItem('locale') as 'FR' | 'EUS';
    if (locale) {
      this.locale.set(locale);
      this.#translocoService.setActiveLang(
        locale.toLowerCase() as 'fr' | 'eus',
      );
    }
  }
}
