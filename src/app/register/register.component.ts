import { Component, inject, OnInit, signal } from '@angular/core';
import { collection, Firestore, getDocs, query } from '@angular/fire/firestore';
import { LocalePipe } from "../locale/locale.pipe";

export interface GlobalsTranslate {
  id: string;
  register_EUS: string;
  register_FR: string;
}

@Component({
  selector: 'anka-register',
  imports: [LocalePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [LocalePipe],
})
export class RegisterComponent implements OnInit {
  #firestore = inject(Firestore);

  globalsTranslate = signal<any>(null);

  async ngOnInit() {
    const querySnapshot = await getDocs(
      query(
        collection(this.#firestore, 'globals'),
      ),
    );
    this.globalsTranslate = {
      id: querySnapshot.docs[0].id,
      ...(querySnapshot.docs[0].data() as any),
    };
  }
}
