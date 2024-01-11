import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiPopoverMenuComponent } from './fhi-popover-menu.component';

describe('FhiPopoverMenuComponent', () => {
  let component: FhiPopoverMenuComponent;
  let fixture: ComponentFixture<FhiPopoverMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FhiPopoverMenuComponent]
    });
    fixture = TestBed.createComponent(FhiPopoverMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
