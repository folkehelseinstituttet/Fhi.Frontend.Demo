import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiDateTimeComponent } from './fhi-date-time.component';

describe('FhiDateTimeComponent', () => {
  let component: FhiDateTimeComponent;
  let fixture: ComponentFixture<FhiDateTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FhiDateTimeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FhiDateTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
