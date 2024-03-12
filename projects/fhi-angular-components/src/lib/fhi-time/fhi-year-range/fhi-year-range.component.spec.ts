import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiYearRangeComponent } from './fhi-year-range.component';
import { LOCALE_ID } from '@angular/core';

describe('FhiYearRangeComponent', () => {
  let component: FhiYearRangeComponent;
  let fixture: ComponentFixture<FhiYearRangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FhiYearRangeComponent],
      providers: [{ provide: LOCALE_ID, useValue: 'nb' }],
    });
    fixture = TestBed.createComponent(FhiYearRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
