import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'anka-help-us',
  imports: [TranslocoDirective, MatButton],
  templateUrl: './help-us.component.html',
  styleUrl: './help-us.component.css',
})
export class HelpUsComponent {}
