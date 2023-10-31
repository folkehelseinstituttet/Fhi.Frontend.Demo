import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiYearRangeComponent } from './fhi-year-range.component';

describe('FhiYearRangeComponent', () => {
  let component: FhiYearRangeComponent;
  let fixture: ComponentFixture<FhiYearRangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FhiYearRangeComponent]
    });
    fixture = TestBed.createComponent(FhiYearRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
