import {
  ApplicationConfig,
  provideZonelessChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideMarkdown } from 'ngx-markdown';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideHttpClient } from '@angular/common/http';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@jsverse/transloco';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimations(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'angeluko-kabalkada',
        appId: '1:841602402665:web:2209dfe4538b3fe62455f8',
        storageBucket: 'angeluko-kabalkada.firebasestorage.app',
        apiKey: 'AIzaSyCRCW1ZELwiHB-knPCgflx_mPSZgRUKR9Y',
        authDomain: 'angeluko-kabalkada.firebaseapp.com',
        messagingSenderId: '841602402665',
      }),
    ),
    provideAuth(() => getAuth()),
    provideMarkdown(),
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: ['eus', 'fr'],
        defaultLang: 'eus',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
  ],
};
