import { Component, inject, OnInit, signal } from '@angular/core';
import {
  collection,
  Firestore,
  getDocs,
  orderBy,
  query,
} from '@angular/fire/firestore';
import { LocalePipe } from '../locale/locale.pipe';
import { MarkdownComponent } from 'ngx-markdown';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';

interface BodySection {
  id: string;
  title_FR: string;
  title_EUS: string;
  markdown_FR: string;
  markdown_EUS: string;
  keywords?: any[];
  footer_FR?: string;
  footer_EUS?: string;
}

@Component({
  selector: 'anka-body',
  imports: [LocalePipe, MarkdownComponent],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css',
  providers: [LocalePipe],
})
export class BodyComponent implements OnInit {
  #firestore = inject(Firestore);
  #dialog = inject(MatDialog);
  #locale = inject(LocalePipe);

  bodySections = signal<BodySection[]>([]);

  async ngOnInit() {
    const bodySections: BodySection[] = [];
    const querySnapshot = await getDocs(
      query(collection(this.#firestore, 'body'), orderBy('order'))
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
          orderBy('order')
        )
      );
      querySnapshot.forEach((doc) => {
        if (!bodySection.keywords) {
          bodySection.keywords = [];
        }
        bodySection.keywords!.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    }
    console.log(bodySections);
    this.bodySections.set(bodySections);
  }

  openKeyword(keyword: any) {
    console.log(keyword);
    this.#dialog.open(DialogDataExampleDialog, {
      data: {
        title: this.#locale.transform(keyword, 'card'),
        markdown: this.#locale.transform(keyword, 'markdown'),
      },
    });
  }
}

@Component({
  selector: 'dialog-data-example-dialog',
  template: ` <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      <markdown [data]="data.markdown" />
    </mat-dialog-content>`,
  imports: [MarkdownComponent, MatDialogTitle, MatDialogContent],
})
export class DialogDataExampleDialog {
  data = inject(MAT_DIALOG_DATA);
}
