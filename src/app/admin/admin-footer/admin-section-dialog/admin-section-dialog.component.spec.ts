import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSectionDialogComponent } from './admin-section-dialog.component';

describe('AdminSectionDialogComponent', () => {
  let component: AdminSectionDialogComponent;
  let fixture: ComponentFixture<AdminSectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSectionDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminSectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
