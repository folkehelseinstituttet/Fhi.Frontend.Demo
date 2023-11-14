import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiYearsComponent } from './fhi-years.component';

describe('FhiYearsComponent', () => {
  let component: FhiYearsComponent;
  let fixture: ComponentFixture<FhiYearsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FhiYearsComponent],
    });
    fixture = TestBed.createComponent(FhiYearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
