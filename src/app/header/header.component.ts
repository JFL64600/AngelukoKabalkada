import { Component } from '@angular/core';
import { LocaleComponent } from '../locale/locale.component';

@Component({
  selector: 'anka-header',
  imports: [LocaleComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
