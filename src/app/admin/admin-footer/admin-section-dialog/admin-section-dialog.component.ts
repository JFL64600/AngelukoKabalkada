import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
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
import { BodySection } from '../../../body/body.component';

@Component({
  selector: 'anka-admin-section-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    JsonPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './admin-section-dialog.component.html',
  styleUrl: './admin-section-dialog.component.css',
})
export class AdminSectionDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AdminSectionDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  sectionForm: FormGroup = new FormGroup({
    title_FR: new FormControl(this.data.title_FR, Validators.required),
    title_EUS: new FormControl(this.data.title_EUS, Validators.required),
    footer_FR: new FormControl(this.data.footer_FR),
    footer_EUS: new FormControl(this.data.footer_EUS),
  });

  onSubmit() {
    if (this.sectionForm.valid) {
      this.dialogRef.close(this.sectionForm.value);
    }
  }
}
