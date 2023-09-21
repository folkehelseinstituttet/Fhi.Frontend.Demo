import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiDateAndTimeComponent } from './fhi-date-and-time.component';

describe('FhiDateAndTimeComponent', () => {
  let component: FhiDateAndTimeComponent;
  let fixture: ComponentFixture<FhiDateAndTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhiDateAndTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FhiDateAndTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
