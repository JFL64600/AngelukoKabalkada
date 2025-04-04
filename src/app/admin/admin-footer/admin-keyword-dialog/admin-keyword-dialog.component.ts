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
  selector: 'anka-admin-keyword-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './admin-keyword-dialog.component.html',
  styleUrl: './admin-keyword-dialog.component.css',
})
export class AdminKeywordDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AdminFooterSectionDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  keywordForm: FormGroup = new FormGroup({
    card_FR: new FormControl(this.data.card_FR, Validators.required),
    card_EUS: new FormControl(this.data.card_EUS, Validators.required),
    markdown_FR: new FormControl(this.data.markdown_FR, Validators.required),
    markdown_EUS: new FormControl(this.data.markdown_EUS, Validators.required),
    imageUrl: new FormControl(this.data.imageUrl),
  });

  onSubmit() {
    if (this.keywordForm.valid) {
      this.dialogRef.close(this.keywordForm.value);
    }
  }
}
