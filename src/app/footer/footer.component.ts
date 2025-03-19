import { Component, inject, OnInit, signal } from '@angular/core';
import { collection, Firestore, getDocs, query } from '@angular/fire/firestore';
import { LocalePipe } from '../locale/locale.pipe';

interface FooterSection {
  id: string;
  title_FR: string;
  title_EUS: string;
  links: { id: string; title_FR: string; title_EUS: string; url: string }[];
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
    const querySnapshot = await getDocs(collection(this.#firestore, 'footer'));
    querySnapshot.forEach((doc) => {
      const footerSection: FooterSection = {
        id: doc.id,
        title_FR: doc.data()['title_FR'],
        title_EUS: doc.data()['title_EUS'],
        links: [],
      };
      footerSections.push(footerSection);
    });
    for await (const footerSection of footerSections) {
      const querySnapshot = await getDocs(
        collection(this.#firestore, 'footer', footerSection.id, 'links')
      );
      querySnapshot.forEach((doc) => {
        footerSection.links.push({
          id: doc.id,
          title_FR: doc.data()['title_FR'],
          title_EUS: doc.data()['title_EUS'],
          url: doc.data()['url'],
        });
      });
    }
    this.footerSections.set(footerSections);
  }
}
