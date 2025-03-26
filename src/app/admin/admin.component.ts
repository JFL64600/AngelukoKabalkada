import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  user,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'anka-admin',
  imports: [AsyncPipe, MatButton],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  auth: Auth = inject(Auth);
  #firestore = inject(Firestore);
  matDialog: MatDialog = inject(MatDialog);
  provider = new GoogleAuthProvider();
  user$ = user(this.auth);
  adminsUid = signal<string[]>([]);

  constructor() {
    this.user$.subscribe((user) => {
      console.log('user', user);
    });
  }

  async ngOnInit() {
    const querySnapshot = await getDocs(collection(this.#firestore, 'admins'));
    const adminsUid: string[] = [];
    querySnapshot.forEach((doc) => {
      adminsUid.push(doc.data()['uid']);
    });
    this.adminsUid.set(adminsUid);
  }

  login() {
    signInWithPopup(this.auth, this.provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      console.log('credential', credential);
      return credential;
    });
  }

  logout() {
    signOut(this.auth)
      .then(() => {
        console.log('signed out');
      })
      .catch((error) => {
        console.log('sign out error: ' + error);
      });
  }
}
