import { Component, inject, model } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'anka-admin-footer-section-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './admin-footer-section-dialog.component.html',
  styleUrl: './admin-footer-section-dialog.component.css',
})
export class AdminFooterSectionDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AdminFooterSectionDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  footerSectionForm: FormGroup = new FormGroup({
    title_FR: new FormControl(this.data.title_FR, Validators.required),
    title_EUS: new FormControl(this.data.title_EUS, Validators.required),
  });

  onSubmit() {
    if (this.footerSectionForm.valid) {
      this.dialogRef.close(this.footerSectionForm.value);
    }
  }
}
