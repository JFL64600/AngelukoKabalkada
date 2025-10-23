import { Component, inject, OnInit, signal } from '@angular/core';
import { LocaleComponent } from '../locale/locale.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { LocaleService } from '../locale/locale.service';
import { CountdownComponent } from '../countdown/countdown.component';

import {
  collection,
  Firestore,
  getDocs,
  orderBy,
  query,
  where,
} from '@angular/fire/firestore';
import { LocalePipe } from '../locale/locale.pipe';
import { MatDialog } from '@angular/material/dialog';
import { DialogDataExampleDialog } from '../body/body.component';
import { RegisterComponent } from '../register/register.component';
import { TranslocoDirective } from '@jsverse/transloco';

export interface HeaderAction {
  id: string;
  title_EUS: string;
  title_FR: string;
  order?: number;
}

@Component({
  selector: 'anka-header',
  imports: [
    LocaleComponent,
    CarouselModule,
    LocalePipe,
    RegisterComponent,
    TranslocoDirective,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [LocalePipe],
})
export class HeaderComponent implements OnInit {
  #firestore = inject(Firestore);
  #dialog = inject(MatDialog);
  #locale = inject(LocalePipe);

  localeService = inject(LocaleService);
  headerActions = signal<HeaderAction[]>([]);

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
      src: 'https://firebasestorage.googleapis.com/v0/b/angeluko-kabalkada.firebasestorage.app/o/CA066B~1-min.JPG?alt=media&token=0b3ea21f-1f98-415d-94ab-934684398e17',
    },
    {
      id: 'slide2',
      src: 'https://firebasestorage.googleapis.com/v0/b/angeluko-kabalkada.firebasestorage.app/o/823A6874-min.jpg?alt=media&token=83a92af3-5721-462f-a64d-a3698d201bd6',
    },
  ]);

  async ngOnInit() {
    const headerActions: HeaderAction[] = [];
    const querySnapshot = await getDocs(
      query(
        collection(this.#firestore, 'header', 'actions', 'footer'),
        orderBy('order'),
        where('order', '>', 0),
      ),
    );
    querySnapshot.forEach((doc) => {
      const headerAction: HeaderAction = {
        id: doc.id,
        ...(doc.data() as any),
      };
      headerActions.push(headerAction);
    });
    this.headerActions.set(headerActions);
  }

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
}
