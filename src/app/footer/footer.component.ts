import { Component, signal } from '@angular/core';

import { LocalePipe } from '../locale/locale.pipe';

export interface FooterLink {
  title_FR: string;
  title_EUS: string;
  url?: string;
  url_FR?: string;
  url_EUS?: string;
}

export interface FooterSection {
  title_FR: string;
  title_EUS: string;
  links: FooterLink[];
}

@Component({
  selector: 'anka-footer',
  imports: [LocalePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  footerSections = signal<FooterSection[]>([
    {
      title_FR: 'Communautés',
      title_EUS: 'Erkidegoak',
      links: [
        {
          url: 'https://www.instagram.com/angeluko_kabalkada/?igsh=dXgyb3VweGV0N3lr',
          title_FR: 'Instagram',
          title_EUS: 'Instagram',
        },
        {
          title_FR: 'Facebook',
          title_EUS: 'Facebook',
          url: 'https://www.facebook.com/people/Angeluko-Kabalkada/61571618303612/?mibextid=LQQJ4d&rdid=D5bRI0r7KI6lMrj2&share_url=https://www.facebook.com/share/1BFLgUouEf/?mibextid=LQQJ4d',
        },
      ],
    },
    {
      title_EUS: 'Erreferentziak',
      title_FR: 'Références',
      links: [
        {
          title_EUS: 'Toberak',
          title_FR: 'Les charivaris ou Toberak',
          url: 'https://www.eke.eus/fr/culture-basque/theatre-basque/charivaris-ou-toberak',
        },
      ],
    },
    {
      title_EUS: 'Berriak',
      title_FR: 'Actualités',
      links: [
        {
          url: 'https://www.sudouest.fr/pyrenees-atlantiques/anglet/anglet-une-grande-cavalcade-en-2026-pour-les-60-ans-d-angeluarrak-23200663.php',
          title_FR:
            'Anglet : une grande cavalcade en 2026 pour les 60 ans d’Angeluarrak (Sud Ouest)',
          title_EUS:
            'Anglet : une grande cavalcade en 2026 pour les 60 ans d’Angeluarrak (Sud Ouest)',
        },
        {
          title_EUS:
            'Kabalkadaren helburua da Angeluko jendea elkartzea... (Gure Irratia)',
          title_FR:
            "Le but de la cavalcade est de rassembler les habitants d'Anglet... (Gure Irratia)",
          url: 'https://gureirratia.eus/berriak/4229-_kabalkadaren_helburua_da_angeluko_jendea_elkartzea_eta_denen_artean_euskara_sustengatu_eta_plazaratzea_',
        },
        {
          title_FR: 'Anglet aura sa cavalcade en septembre 2026 (mediabask)',
          title_EUS: 'Anglet aura sa cavalcade en septembre 2026 (mediabask)',
          url: 'https://www.mediabask.eus/fr/info_mbsk/20250113/anglet-aura-sa-cavalcade-en-septembre',
        },
      ],
    },
  ]);
}
