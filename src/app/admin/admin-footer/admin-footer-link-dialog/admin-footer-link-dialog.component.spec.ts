import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFooterLinkDialogComponent } from './admin-footer-link-dialog.component';

describe('AdminFooterLinkDialogComponent', () => {
  let component: AdminFooterLinkDialogComponent;
  let fixture: ComponentFixture<AdminFooterLinkDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFooterLinkDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminFooterLinkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
