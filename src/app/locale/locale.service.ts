import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  locale = signal<'FR' | 'EUS'>('FR');

  constructor() {
    const locale = localStorage.getItem('locale') as 'FR' | 'EUS';
    if (locale) {
      this.locale.set(locale);
    }
  }
}
