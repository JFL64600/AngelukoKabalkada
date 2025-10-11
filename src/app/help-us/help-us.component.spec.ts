import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpUsComponent } from './help-us.component';

describe('HelpUsComponent', () => {
  let component: HelpUsComponent;
  let fixture: ComponentFixture<HelpUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpUsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
