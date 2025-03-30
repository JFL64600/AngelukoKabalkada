import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFooterSectionDialogComponent } from './admin-footer-section-dialog.component';

describe('AdminFooterSectionDialogComponent', () => {
  let component: AdminFooterSectionDialogComponent;
  let fixture: ComponentFixture<AdminFooterSectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFooterSectionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFooterSectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
