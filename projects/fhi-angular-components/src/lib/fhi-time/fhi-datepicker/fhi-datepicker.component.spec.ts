import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiDatepickerComponent } from './fhi-datepicker.component';
import { LOCALE_ID } from '@angular/core';

describe('FhiDatepickerComponent', () => {
  let component: FhiDatepickerComponent;
  let fixture: ComponentFixture<FhiDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FhiDatepickerComponent],
      providers: [{ provide: LOCALE_ID, useValue: 'nb' }],
    }).compileComponents();

    fixture = TestBed.createComponent(FhiDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
