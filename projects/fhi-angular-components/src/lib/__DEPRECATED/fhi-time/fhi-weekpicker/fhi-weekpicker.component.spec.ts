import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiWeekpickerComponent } from './fhi-weekpicker.component';

describe('FhiWeekpickerComponent', () => {
  let component: FhiWeekpickerComponent;
  let fixture: ComponentFixture<FhiWeekpickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FhiWeekpickerComponent],
    });
    fixture = TestBed.createComponent(FhiWeekpickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
