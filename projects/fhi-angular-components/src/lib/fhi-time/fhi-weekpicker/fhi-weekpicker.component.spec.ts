import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiTimeSelectorWeekComponent } from './fhi-weekpicker.component';

describe('FhiTimeSelectorWeekComponent', () => {
  let component: FhiTimeSelectorWeekComponent;
  let fixture: ComponentFixture<FhiTimeSelectorWeekComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FhiTimeSelectorWeekComponent]
    });
    fixture = TestBed.createComponent(FhiTimeSelectorWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
