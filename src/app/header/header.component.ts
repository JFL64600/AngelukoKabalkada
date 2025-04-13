import { Component, inject, signal } from '@angular/core';
import { LocaleComponent } from '../locale/locale.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { LocaleService } from '../locale/locale.service';
import { CountdownComponent } from '../countdown/countdown.component';

@Component({
  selector: 'anka-header',
  imports: [LocaleComponent, CarouselModule, CountdownComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  localeService = inject(LocaleService);

  date1 = new Date('2026-09-20');
  date2 = new Date('2026-09-26');
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: false,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
  };

  slides = signal([
    {
      id: 'slide1',
      src: 'https://firebasestorage.googleapis.com/v0/b/angeluko-kabalkada.firebasestorage.app/o/CA066B~1.JPG?alt=media&token=f74c6283-ce0d-41c6-8726-1cc341249e93',
    },
    {
      id: 'slide2',
      src: 'https://firebasestorage.googleapis.com/v0/b/angeluko-kabalkada.firebasestorage.app/o/823A6874.jpg?alt=media&token=ff04fde0-005a-44d9-bb6d-d1550f180b13',
    },
  ]);
}
