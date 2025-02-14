import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiYearMonthRangeComponent } from './fhi-year-month-range.component';

describe('FhiYearMonthRangeComponent', () => {
  let component: FhiYearMonthRangeComponent;
  let fixture: ComponentFixture<FhiYearMonthRangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FhiYearMonthRangeComponent],
    });
    fixture = TestBed.createComponent(FhiYearMonthRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
