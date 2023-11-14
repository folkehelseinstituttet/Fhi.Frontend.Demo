import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiMonthsComponent } from './fhi-months.component';

describe('FhiMonthsComponent', () => {
  let component: FhiMonthsComponent;
  let fixture: ComponentFixture<FhiMonthsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FhiMonthsComponent],
    });
    fixture = TestBed.createComponent(FhiMonthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
