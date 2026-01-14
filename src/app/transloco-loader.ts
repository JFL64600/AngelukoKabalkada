import { Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  getTranslation(lang: string) {
    return from(
      fetch(`/i18n/${lang}.json`).then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load translation: ${res.status}`);
        }
        return res.json() as Translation;
      })
    );
  }
}
