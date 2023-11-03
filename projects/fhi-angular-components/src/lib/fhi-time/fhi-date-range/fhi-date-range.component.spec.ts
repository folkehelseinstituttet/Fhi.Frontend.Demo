import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiDateRangeComponent } from './fhi-date-range.component';

describe('FhiDateRangeComponent', () => {
  let component: FhiDateRangeComponent;
  let fixture: ComponentFixture<FhiDateRangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FhiDateRangeComponent]
    });
    fixture = TestBed.createComponent(FhiDateRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
