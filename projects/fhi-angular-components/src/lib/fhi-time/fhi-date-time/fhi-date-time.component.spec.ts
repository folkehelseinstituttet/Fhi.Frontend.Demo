import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiDateTimeComponent } from './fhi-date-time.component';
import { LOCALE_ID } from '@angular/core';

describe('FhiDateTimeComponent', () => {
  let component: FhiDateTimeComponent;
  let fixture: ComponentFixture<FhiDateTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FhiDateTimeComponent],
      providers: [{ provide: LOCALE_ID, useValue: 'nb' }],
    }).compileComponents();

    fixture = TestBed.createComponent(FhiDateTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
