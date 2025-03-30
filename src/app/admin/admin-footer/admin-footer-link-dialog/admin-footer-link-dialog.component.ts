import { Component, inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { AdminFooterSectionDialogComponent } from '../admin-footer-section-dialog/admin-footer-section-dialog.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'anka-admin-footer-link-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './admin-footer-link-dialog.component.html',
  styleUrl: './admin-footer-link-dialog.component.css',
})
export class AdminFooterLinkDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AdminFooterSectionDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  footerLinkForm: FormGroup = new FormGroup({
    title_FR: new FormControl(this.data.title_FR, Validators.required),
    title_EUS: new FormControl(this.data.title_EUS, Validators.required),
    url: new FormControl(this.data.url),
    url_FR: new FormControl(this.data.url_FR),
    url_EUS: new FormControl(this.data.url_EUS),
  });

  onSubmit() {
    if (
      this.footerLinkForm.valid &&
      (this.footerLinkForm.get('url')?.value ||
        (this.footerLinkForm.get('url_FR')?.value &&
          this.footerLinkForm.get('url_EUS')?.value))
    ) {
      this.dialogRef.close(this.footerLinkForm.value);
    }
  }
}
