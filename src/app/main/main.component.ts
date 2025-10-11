import { Component } from '@angular/core';
import { BodyComponent } from '../body/body.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { VideoComponent } from '../video/video.component';
import { HelpUsComponent } from '../help-us/help-us.component';

@Component({
  selector: 'anka-main',
  standalone: true,
  imports: [
    HeaderComponent,
    VideoComponent,
    BodyComponent,
    HelpUsComponent,
    FooterComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {}
