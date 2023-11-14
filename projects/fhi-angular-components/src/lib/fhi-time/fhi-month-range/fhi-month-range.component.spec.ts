import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiMonthRangeComponent } from './fhi-month-range.component';

describe('FhiMonthRangeComponent', () => {
  let component: FhiMonthRangeComponent;
  let fixture: ComponentFixture<FhiMonthRangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FhiMonthRangeComponent]
    });
    fixture = TestBed.createComponent(FhiMonthRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
