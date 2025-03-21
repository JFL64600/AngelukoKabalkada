import { Component, computed, inject, input } from '@angular/core';
import { LocaleService } from '../locale/locale.service';

@Component({
  selector: 'anka-countdown',
  imports: [],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.css',
})
export class CountdownComponent {
  localeService = inject(LocaleService);

  date = input.required<Date>();

  remainingTime = computed(() => {
    const now = new Date().getTime();
    const distance = this.date().getTime() - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    return { days, hours };
  });
}
