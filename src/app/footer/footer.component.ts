import { Component, signal } from '@angular/core';

interface FooterSection {
  title: string;
  links: { title: string; url: string }[];
}

@Component({
  selector: 'anka-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  footerSections = signal<FooterSection[]>([
    {
      title: 'About',
      links: [
        { title: 'Company', url: '/company' },
        { title: 'Contact', url: '/contact' },
        { title: 'Careers', url: '/careers' },
      ],
    },
    {
      title: 'Services',
      links: [
        { title: 'Consulting', url: '/consulting' },
        { title: 'Development', url: '/development' },
        { title: 'Design', url: '/design' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { title: 'Privacy', url: '/privacy' },
        { title: 'Terms', url: '/terms' },
        { title: 'Cookies', url: '/cookies' },
      ],
    },
  ]);
}
