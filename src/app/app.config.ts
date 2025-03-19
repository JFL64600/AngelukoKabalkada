import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideMarkdown } from 'ngx-markdown';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'angeluko-kabalkada',
        appId: '1:841602402665:web:2209dfe4538b3fe62455f8',
        storageBucket: 'angeluko-kabalkada.firebasestorage.app',
        apiKey: 'AIzaSyCRCW1ZELwiHB-knPCgflx_mPSZgRUKR9Y',
        authDomain: 'angeluko-kabalkada.firebaseapp.com',
        messagingSenderId: '841602402665',
      })
    ),
    provideFirestore(() => getFirestore()),
    provideMarkdown(),
  ],
};
