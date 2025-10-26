import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { TranslocoDirective } from '@jsverse/transloco';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'anka-help-us',
  imports: [TranslocoDirective, MatButton, MarkdownComponent],
  templateUrl: './help-us.component.html',
  styleUrl: './help-us.component.css',
})
export class HelpUsComponent {}
