import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

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
import { LocaleService } from '../locale/locale.service';
import { TranslocoDirective } from '@jsverse/transloco';

export interface BodyKeyword {
  card_FR: string;
  card_EUS: string;
  markdown_FR?: string;
  markdown_EUS?: string;
  imageUrl?: string;
}

export interface BodySection {
  title_FR: string;
  title_EUS: string;
  markdown_FR?: string;
  markdown_EUS?: string;
  keywords: BodyKeyword[];
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
export class BodyComponent {
  #dialog = inject(MatDialog);
  #locale = inject(LocalePipe);
  localeService = inject(LocaleService);

  bodySections = signal<BodySection[]>([
    {
      footer_FR: 'Mais du coup, comment je peux participer ?',
      title_FR: 'Angeluko Kabalkada',
      footer_EUS: 'Baina nola parte hartu dezaket?',
      title_EUS: 'Angeluko Kabalkada',
      keywords: [
        {
          card_FR: '2026',
          markdown_FR:
            'En **2026**, le groupe **Angeluarrak** fêtera ses **60 ans** d’existence à Anglet. En 60 ans, le groupe a marqué notre ville par sa présence à différentes occasions. De même, il a vu passé par les terres de Choisy, de nombreuses familles Angeluar, venues s’investir dans la culture et l’associatif… Parce qu’au-delà de ses activités, **Angeluarrak** est aussi, comme de nombreuses associations, porteur de valeurs et d’engagement auprès de tous.',
          imageUrl:
            'https://firebasestorage.googleapis.com/v0/b/angeluko-kabalkada.firebasestorage.app/o/2026.jpg?alt=media&token=575a6198-811d-48c0-89ad-dc4970eddfa7',
          card_EUS: '2026',
          markdown_EUS:
            '**2026**. urtean, **Angeluarrak** taldeak **60 urte** beteko ditu Angelun. 60 urtez, taldeak gure hiria markatu du hainbat ekitaldietan parte hartuz. Gainera, taldeak Choisy-ko lurraldeetatik Angeluar familia anitz pasatzen ikusi ditu, kultura eta elkartean inplikatzeko etorriak… Izan ere, bere jarduerez gain, **Angeluarrak**, beste hainbat elkarte bezala, balio eta engaiamendu eramaile da.',
        },
        {
          card_EUS: 'Angeluarrak',
          imageUrl:
            'https://firebasestorage.googleapis.com/v0/b/angeluko-kabalkada.firebasestorage.app/o/angeluarrak.jpg?alt=media&token=f5117d74-ec21-4ce4-b3e2-c134937e1018',
          markdown_EUS:
            'Azken urteetan, taldeak misio berri bat hartu du: dantza bere jatorrizko tokian ezartzea, karrikan eta plazetan, lehentasunez ukanik nagusiki,  transmisioaren ardura. Horretarako, lana funtsezko uneetan zentratu  da: trukaketak, partekatze momentuak, besta eta elkarbizitza garaiak, sinbolismo eta emozioz beterik. Momentu horiek, usaian erritualak deitzen direnak, solstizioen inguruan kokatzen dira (Olentzeroren etorrera neguan, eta Donibaneko Suak udan) baita ihauteri denboraldian, gehiengoarekin partekaturik.',
          card_FR: 'Angeluarrak',
          markdown_FR:
            'Ces dernières années, le groupe s’est donné cette nouvelle mission de remettre la danse à sa place d’origine, dans la rue et sur les places, et tout cela avec le souci premier et prioritaire de la transmission. Pour se faire, le travail s’est axé sur les moments essentiels : les temps d’échanges, de partage, de fêtes et de convivialité mais aussi forts de symboliques et d’émotions. Ces temps-là, nommés couramment rituels, se fixe autour des solstices (venue d’Olentzero en hivers, et Donibaneko Suak en été) mais aussi le temps des carnavals, partagés avec le plus grand nombre.',
        },
        {
          imageUrl:
            'https://firebasestorage.googleapis.com/v0/b/angeluko-kabalkada.firebasestorage.app/o/donibaneko-suak.jpg?alt=media&token=d9f562dc-40bd-45b5-bdec-86b303cd1dd3',
          card_EUS: 'Dinamika',
          card_FR: 'Dynamique',
          markdown_FR:
            'Ces démarches ont été possibles grâce à une réelle dynamique populaire et associative mêlant des associations angeluar telles que l’ikastola Kimua, Ibaialde, Manex Goyenetche Kultur Etxea, Muslariak, Suak Angelun, Gaia… mais aussi l’ensemble des écoles immersives, bilingues privées ou publiques d’Anglet.\n\nC’est donc tout naturellement qu’Angeluarrak a souhaité partager cette année d’anniversaire avec tous ceux avec qui elle partage déjà tant de choses, en proposant de remonter une cavalcade. ',
          markdown_EUS:
            'Urrats horiek posible izan dira herri eta elkarte dinamika erreal bati esker, Angeluko elkarteak nahasiz, hala nola, Kimua ikastola, Ibaialde, Manex Goyenetche Kultur Etxea, Muslariak, Suak Angelun, Gaia… baina baita Angeluko eskola elebidun pribatu edo publiko guztiak ere.\n\nBeraz, naturaltasun osoz, Angeluarrak elkarteak urtebetetze urte hau jadanik hainbeste gauza partekatzen dituzten guztiekin partekatu nahi izan du, berriz kabalkada baten muntatzea proposatuz.',
        },
      ],
    },
    /*{
      title_EUS: 'Postuak',
      title_FR: 'Les postes',
      keywords: [
        {
          card_FR: 'Danse ',
          imageUrl:
            'https://firebasestorage.googleapis.com/v0/b/angeluko-kabalkada.firebasestorage.app/o/dantea.jpg?alt=media&token=847cdb96-1857-4adf-9a70-1be2f39a7cd2',
          card_EUS: 'Dantza',
          markdown_FR:
            'C’est le premier endroit d’engagement au sein d’une cavalcade. S’il demeure ouvert à tous, il demande un minimum de motivation et d’appétence. Le danseur est l’acteur principal d’une cavalcade !',
          markdown_EUS:
            'Kabalkada baten lehen engaiamendu lekua da. Deneri irekia baldin bada, gutxieneko motibazioa eta gutizia eskatzen ditu. Dantzaria kabalkada bateko aktore nagusia da!',
        },
        {
          markdown_EUS:
            'Lehenik eta behin, Angelu-ko kabalkadan parte hartzeko, ondoko egoera batean egon behar da: <ul>     <li>Angeluarrak taldeko ohiko kide edo kide aktiboa,</li>     <li>Angeluko elkarte baten kide,</li>     <li>Angeluar edo Angelun bizi den pertsona.</li> </ul>',
          imageUrl:
            'https://firebasestorage.googleapis.com/v0/b/angeluko-kabalkada.firebasestorage.app/o/logo%20anglet.webp?alt=media&token=d181ce81-9c59-4d8a-af70-bc286fc231a7',
          card_EUS: 'Angelu',
          card_FR: 'Angelu',
          markdown_FR:
            'Tout d’abord, pour pouvoir s’engager au sein de la cavalcade d’Angelu, il vous faudra être dans l’une des situations suivantes : <ul>   <li>Actuel ou ancien membre d’Angeluarrak,</li>   <li>Membre d’une association d’Anglet,</li>   <li>Angeluar ou résidant à Anglet.</li> </ul>',
        },
        {
          card_FR: 'Théâtre',
          markdown_EUS:
            'Antzerki satiriko herrikoiak, toberak Kabalkada baten arimak dira, Euskara hutsean. ',
          card_EUS: 'Toberak',
          markdown_FR:
            'Théâtre satirique populaire, les toberak sont l’âme d’une cavalcade, exclusivement en Euskara.',
        },
        {
          card_FR: 'Musique',
          imageUrl:
            'https://firebasestorage.googleapis.com/v0/b/angeluko-kabalkada.firebasestorage.app/o/musika.jpg?alt=media&token=534ba1cb-48f2-42c5-bc8f-864f0ae40063',
          markdown_EUS:
            'Kabalkada zehazten duen tonuak musikak ematen du. Batez ere: metalezko tresnak, egurrezko tresnak, biolinak, akordeoiak, tresna tradizionalak (txistu, xirul...) xerkatuko dira.',
          markdown_FR:
            'C’est elle qui donne le ton de la cavalcade. Seront recherché essentiellement : cuivres, bois, violons, accordéons, instruments traditionnels (txistu, xirul…) .',
          card_EUS: 'Musika',
        },
        {
          imageUrl:
            'https://firebasestorage.googleapis.com/v0/b/angeluko-kabalkada.firebasestorage.app/o/jantzigintza.jpg?alt=media&token=f278c674-4990-4a9a-b85a-7130cc01ec83',
          markdown_EUS:
            'Ehundik gora jantzi ezberdin kudeatu beharko ditu gure jantzigintza taldeak. Laguntza ez da gehiegizkoa izanen!',
          markdown_FR:
            'Ce sont plus d’une centaine de costumes différents que devront gérer notre équipe de couturières. Un coup de main ne sera pas de trop !',
          card_FR: 'Couture',
          card_EUS: 'Jantzigintza',
        },
        {
          card_EUS: 'Logistika',
          card_FR: 'Logistique',
          markdown_EUS:
            'Kabalkada bat elkarretaratze handi bat da: taberna gibelean, kanpoan, sarreretan, apainketak sortzen edo muntaketa/deskargan… denen beharra bada! ',
          markdown_FR:
            'Une cavalcade demeure un grand rassemblement festif : derrière le comptoir, à la billetterie, création de décors, ou encore au montage/démontage : il y a besoin de tous (bricoleurs, ou pas !). ',
        },
      ],
    },*/
  ]);

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
  selector: 'dialog-tile-detail',
  template: ` <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      <markdown [data]="data.markdown" />
    </mat-dialog-content>
    <mat-dialog-actions *transloco="let t; prefix: 'dialog'">
      @if (data.index > 0) {
        <button mat-button [mat-dialog-close]="'prev'">
          {{ t('previous') }}
        </button>
      }
      @if (data.index < data.length - 1) {
        <button mat-button [mat-dialog-close]="'next'" cdkFocusInitial>
          {{ t('next') }}
        </button>
      } @else {
        <button mat-button [mat-dialog-close] cdkFocusInitial>
          {{ t('close') }}
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
    TranslocoDirective,
  ],
})
export class DialogDataExampleDialog {
  data = inject(MAT_DIALOG_DATA);
  localeService = inject(LocaleService);
}
