import { Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  getTranslation(lang: string) {
    // Sanitize language parameter to prevent path traversal
    const sanitizedLang = lang.replace(/[^a-zA-Z0-9_-]/g, '');
    
    if (!sanitizedLang) {
      throw new Error(`Invalid language code: "${lang}"`);
    }
    
    return from(
      fetch(`/i18n/${sanitizedLang}.json`).then((res) => {
        if (!res.ok) {
          throw new Error(
            `Failed to load translation: ${res.status} ${res.statusText}`
          );
        }
        return res.json() as Translation;
      })
    );
  }
}
