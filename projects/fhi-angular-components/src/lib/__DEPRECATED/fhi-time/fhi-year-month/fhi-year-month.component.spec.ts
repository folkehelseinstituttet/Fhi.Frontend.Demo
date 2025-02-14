import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiYearMonthComponent } from './fhi-year-month.component';

describe('FhiYearMonthComponent', () => {
  let component: FhiYearMonthComponent;
  let fixture: ComponentFixture<FhiYearMonthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FhiYearMonthComponent],
    });
    fixture = TestBed.createComponent(FhiYearMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
