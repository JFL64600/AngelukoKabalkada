import { inject, Pipe, PipeTransform } from '@angular/core';
import { LocaleService } from './locale.service';

@Pipe({
  name: 'locale',
  pure: false,
})
export class LocalePipe implements PipeTransform {
  localeService = inject(LocaleService);

  transform(value: any, prefix: string): string {
    let text = value[`${prefix}_${this.localeService.locale()}`];
    if (!text) {
      text = value[`${prefix}`];
    }
    return text;
  }
}
