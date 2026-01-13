import { Component, inject, OnInit, signal } from '@angular/core';
import { LocaleComponent } from '../locale/locale.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { LocaleService } from '../locale/locale.service';

import { LocalePipe } from '../locale/locale.pipe';
import { MatDialog } from '@angular/material/dialog';
import { DialogDataExampleDialog } from '../body/body.component';
import { TranslocoDirective } from '@jsverse/transloco';

export interface HeaderAction {
  id: string;
  title_EUS: string;
  title_FR: string;
  markdown_EUS: string;
  markdown_FR: string;
  order?: number;
}

@Component({
  selector: 'anka-header',
  imports: [LocaleComponent, CarouselModule, TranslocoDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [LocalePipe],
})
export class HeaderComponent {
  #dialog = inject(MatDialog);
  #locale = inject(LocalePipe);

  localeService = inject(LocaleService);
  headerActions = signal<HeaderAction[]>([
    {
      id: '1',
      markdown_FR:
        'Il s’agit d’une représentation populaire de grande envergure regroupant tout un village par la danse, théâtre, musique… Sa structure et son montage sont codifiés et pour vous aider à mieux comprendre, une page explicative et des documents sont mis à disposition sur le site internet d’Angeluko Kabalkada en cliquant ici.',
      title_FR: 'Calvalcade',
      order: 1,
      markdown_EUS:
        'Kabalkada bat herriko antzerki, dantza, musika... elkartzen dituen ikuskizun handia da. Bere egitura eta muntaketak kodifikaturik dira. Horren hobeki ulertzeko, azalpen orri bat eta dokumentuak eskuragarri dira Angeluko Kabalkadaren webgunean, hemen klik eginez.',
      title_EUS: 'Kabalkada',
    },
    {
      id: '2',
      order: 2,
      markdown_FR:
        'Une cavalcade est un moment singulier dans la vie d’une communauté et il demande un investissement à la hauteur de l’enjeu. Cela représentera un an de préparation, de répétitions, d’écriture etc. et l’engagement de chacun doit être entier et régulier. Des calendriers et des dates fixes seront établies durant l’été afin de permettre à chacun de s’organiser.',
      title_EUS: 'Nola?',
      title_FR: 'Comment ?',
      markdown_EUS:
        'Kabalkada une berezia da komunitate baten bizian, eta erronkaren araberako engaiamendua  eskatzen du. Horrek urte bateko prestaketa, errepikapen, idazkera eta abar ekarriko ditu, eta bakoitzaren engaiamenduak osoak eta erregularrak izan behar dute. Egutegiak eta data finkoak udan finkatuko dira, bakoitza antola dadin.',
    },
  ]);

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
      src: 'images/slide1.avif',
    },
    {
      id: 'slide2',
      src: 'images/slide2.avif',
    },
  ]);

  openAction(index: number) {
    const headerAction = this.headerActions()[index];
    const dialogRef = this.#dialog.open(DialogDataExampleDialog, {
      data: {
        title: this.#locale.transform(headerAction, 'title'),
        markdown: this.#locale.transform(headerAction, 'markdown'),
        index,
        length: this.headerActions().length,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'prev') {
        this.openAction(index - 1);
      } else if (result === 'next') {
        this.openAction(index + 1);
      }
    });
  }

  scrollToHelpUs() {
    const element = document.getElementById('help-us');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
