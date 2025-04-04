import { Component } from '@angular/core';
import { BodyComponent } from '../body/body.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'anka-main',
  imports: [HeaderComponent, BodyComponent, FooterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {}
