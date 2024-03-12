import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiYearMonthComponent } from './fhi-year-month.component';
import { LOCALE_ID } from '@angular/core';

describe('FhiYearMonthComponent', () => {
  let component: FhiYearMonthComponent;
  let fixture: ComponentFixture<FhiYearMonthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FhiYearMonthComponent],
      providers: [{ provide: LOCALE_ID, useValue: 'nb' }],
    });
    fixture = TestBed.createComponent(FhiYearMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
