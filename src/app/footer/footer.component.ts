import { Component, inject, OnInit, signal } from '@angular/core';
import {
  collection,
  Firestore,
  getDocs,
  orderBy,
  query,
} from '@angular/fire/firestore';
import { LocalePipe } from '../locale/locale.pipe';

export interface FooterLink {
  id: string;
  title_FR: string;
  title_EUS: string;
  url?: string;
  url_FR?: string;
  url_EUS?: string;
  order?: number;
}

export interface FooterSection {
  id: string;
  title_FR: string;
  title_EUS: string;
  links: FooterLink[];
  order?: number;
}

@Component({
  selector: 'anka-footer',
  imports: [LocalePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit {
  #firestore = inject(Firestore);

  footerSections = signal<FooterSection[]>([]);

  async ngOnInit() {
    const footerSections: FooterSection[] = [];
    const querySnapshot = await getDocs(
      query(collection(this.#firestore, 'footer'), orderBy('order')),
    );
    querySnapshot.forEach((doc) => {
      const footerSection: FooterSection = {
        id: doc.id,
        ...(doc.data() as any),
        links: [],
      };
      footerSections.push(footerSection);
    });
    for await (const footerSection of footerSections) {
      const querySnapshot = await getDocs(
        query(
          collection(this.#firestore, 'footer', footerSection.id, 'links'),
          orderBy('order'),
        ),
      );
      querySnapshot.forEach((doc) => {
        footerSection.links.push({
          id: doc.id,
          ...(doc.data() as any),
        });
      });
    }
    console.log(footerSections);
    this.footerSections.set(footerSections);
  }
}
