import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiWeekRangeComponent } from './fhi-week-range.component';
import { I18nService } from '../shared/i18n/i18n.service';
import { LOCALE_ID } from '@angular/core';

describe('FhiWeekRangeComponent', () => {
  let component: FhiWeekRangeComponent;
  let fixture: ComponentFixture<FhiWeekRangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FhiWeekRangeComponent],
      providers: [{ provide: I18nService }, { provide: LOCALE_ID, useValue: 'nb' }],
    });

    fixture = TestBed.createComponent(FhiWeekRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
