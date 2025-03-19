import { Component, inject } from '@angular/core';
import { LocaleService } from './locale.service';

@Component({
  selector: 'anka-locale',
  imports: [],
  templateUrl: './locale.component.html',
  styleUrl: './locale.component.css',
})
export class LocaleComponent {
  localeService = inject(LocaleService);

  changeLanguage(language: 'FR' | 'EUS') {
    this.localeService.locale.set(language);
    localStorage.setItem('locale', language);
  }
}
