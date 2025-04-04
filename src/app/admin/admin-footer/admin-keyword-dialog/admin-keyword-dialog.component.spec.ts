import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKeywordDialogComponent } from './admin-keyword-dialog.component';

describe('AdminKeywordDialogComponent', () => {
  let component: AdminKeywordDialogComponent;
  let fixture: ComponentFixture<AdminKeywordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminKeywordDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminKeywordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
