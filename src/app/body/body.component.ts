import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import {
  collection,
  Firestore,
  getDocs,
  orderBy,
  query,
  where,
} from '@angular/fire/firestore';
import { LocalePipe } from '../locale/locale.pipe';
import { MarkdownComponent } from 'ngx-markdown';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogTitle,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { CountdownComponent } from '../countdown/countdown.component';
import { LocaleService } from '../locale/locale.service';
import { RegisterComponent } from '../register/register.component';

export interface BodyKeyword {
  id: string;
  card_FR: string;
  card_EUS: string;
  markdown_FR: string;
  markdown_EUS: string;
  imageUrl?: string;
  order?: number;
}

export interface BodySection {
  id: string;
  title_FR: string;
  title_EUS: string;
  markdown_FR: string;
  markdown_EUS: string;
  keywords: BodyKeyword[];
  footer_FR?: string;
  footer_EUS?: string;
  order?: number;
}

@Component({
  selector: 'anka-body',
  imports: [LocalePipe, MarkdownComponent, RegisterComponent],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css',
  providers: [LocalePipe],
})
export class BodyComponent implements OnInit {
  #firestore = inject(Firestore);
  #dialog = inject(MatDialog);
  #locale = inject(LocalePipe);
  localeService = inject(LocaleService);

  bodySections = signal<BodySection[]>([]);

  async ngOnInit() {
    const bodySections: BodySection[] = [];
    const querySnapshot = await getDocs(
      query(
        collection(this.#firestore, 'body'),
        orderBy('order'),
        where('order', '>', 0),
      ),
    );
    querySnapshot.forEach((doc) => {
      const bodySection: BodySection = {
        id: doc.id,
        ...(doc.data() as any),
      };
      bodySections.push(bodySection);
    });
    for await (const bodySection of bodySections) {
      const querySnapshot = await getDocs(
        query(
          collection(this.#firestore, 'body', bodySection.id, 'keywords'),
          orderBy('order'),
        ),
      );
      querySnapshot.forEach((doc) => {
        if (!bodySection.keywords) {
          bodySection.keywords = [];
        }
        bodySection.keywords!.push({
          id: doc.id,
          ...doc.data(),
        } as BodyKeyword);
      });
    }
    console.log(bodySections);
    this.bodySections.set(bodySections);
  }

  openKeyword(keywords: any[], index: number) {
    const keyword = keywords[index];
    console.log(keyword);
    const dialogRef = this.#dialog.open(DialogDataExampleDialog, {
      data: {
        title: this.#locale.transform(keyword, 'card'),
        markdown: this.#locale.transform(keyword, 'markdown'),
        index,
        length: keywords.length,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result === 'prev') {
        this.openKeyword(keywords, index - 1);
      } else if (result === 'next') {
        this.openKeyword(keywords, index + 1);
      }
    });
  }
}

@Component({
  selector: 'dialog-data-example-dialog',
  template: ` <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      <markdown [data]="data.markdown" />
    </mat-dialog-content>
    <mat-dialog-actions>
      @if (data.index > 0) {
        <button mat-button [mat-dialog-close]="'prev'">
          @if (localeService.locale() === 'FR') {
            Précédent
          } @else {
            Aurrekoa
          }
        </button>
      }
      @if (data.index < data.length - 1) {
        <button mat-button [mat-dialog-close]="'next'" cdkFocusInitial>
          @if (localeService.locale() === 'FR') {
            Suivant
          } @else {
            Jarraian
          }
        </button>
      } @else {
        <button mat-button [mat-dialog-close] cdkFocusInitial>
          @if (localeService.locale() === 'FR') {
            Fermer
          } @else {
            Itxi
          }
        </button>
      }
    </mat-dialog-actions>`,
  imports: [
    MarkdownComponent,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
})
export class DialogDataExampleDialog {
  data = inject(MAT_DIALOG_DATA);
  localeService = inject(LocaleService);
}
