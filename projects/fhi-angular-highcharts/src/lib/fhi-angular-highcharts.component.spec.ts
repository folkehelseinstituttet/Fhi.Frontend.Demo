import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiAngularHighchartsComponent } from './fhi-angular-highcharts.component';

describe('FhiAngularHighchartsComponent', () => {
  let component: FhiAngularHighchartsComponent;
  let fixture: ComponentFixture<FhiAngularHighchartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FhiAngularHighchartsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FhiAngularHighchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
