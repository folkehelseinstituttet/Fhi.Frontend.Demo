import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiWeekRangeComponent } from './fhi-week-range.component';

describe('FhiWeekRangeComponent', () => {
  let component: FhiWeekRangeComponent;
  let fixture: ComponentFixture<FhiWeekRangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FhiWeekRangeComponent]
    });
    fixture = TestBed.createComponent(FhiWeekRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
