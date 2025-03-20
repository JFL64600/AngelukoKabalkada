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

interface BodySection {
  id: string;
  title_FR: string;
  title_EUS: string;
  markdown_FR: string;
  markdown_EUS: string;
}

@Component({
  selector: 'anka-body',
  imports: [LocalePipe, MarkdownComponent],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css',
})
export class BodyComponent implements OnInit {
  #firestore = inject(Firestore);

  bodySections = signal<BodySection[]>([]);

  async ngOnInit() {
    const bodySections: BodySection[] = [];
    const querySnapshot = await getDocs(
      query(collection(this.#firestore, 'body'), orderBy('order'))
    );
    querySnapshot.forEach((doc) => {
      const bodySection: BodySection = {
        id: doc.id,
        title_FR: doc.data()['title_FR'],
        title_EUS: doc.data()['title_EUS'],
        markdown_FR: doc.data()['markdown_FR'],
        markdown_EUS: doc.data()['markdown_EUS'],
      };
      bodySections.push(bodySection);
    });
    this.bodySections.set(bodySections);
  }
}
