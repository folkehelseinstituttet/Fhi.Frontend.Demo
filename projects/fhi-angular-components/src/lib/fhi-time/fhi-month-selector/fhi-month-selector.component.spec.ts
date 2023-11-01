import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiMonthSelectorComponent } from './fhi-month-selector.component';

describe('FhiMonthSelectorComponent', () => {
  let component: FhiMonthSelectorComponent;
  let fixture: ComponentFixture<FhiMonthSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FhiMonthSelectorComponent]
    });
    fixture = TestBed.createComponent(FhiMonthSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
