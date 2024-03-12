import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiWeekpickerComponent } from './fhi-weekpicker.component';
import { LOCALE_ID } from '@angular/core';

describe('FhiWeekpickerComponent', () => {
  let component: FhiWeekpickerComponent;
  let fixture: ComponentFixture<FhiWeekpickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FhiWeekpickerComponent],
      providers: [{ provide: LOCALE_ID, useValue: 'nb' }],
    });
    fixture = TestBed.createComponent(FhiWeekpickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
