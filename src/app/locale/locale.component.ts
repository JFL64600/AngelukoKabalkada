import { Component, inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { LocaleService } from './locale.service';

@Component({
  selector: 'anka-locale',
  imports: [],
  templateUrl: './locale.component.html',
  styleUrl: './locale.component.css',
})
export class LocaleComponent {
  #translocoService = inject(TranslocoService);
  localeService = inject(LocaleService);

  changeLanguage(language: 'eus' | 'fr') {
    this.#translocoService.setActiveLang(language);
    this.localeService.locale.set(language.toUpperCase() as 'FR' | 'EUS');
    localStorage.setItem('locale', language.toUpperCase() as 'FR' | 'EUS');
  }

  getCurrentLanguage(): string {
    return this.#translocoService.getActiveLang();
  }
}
