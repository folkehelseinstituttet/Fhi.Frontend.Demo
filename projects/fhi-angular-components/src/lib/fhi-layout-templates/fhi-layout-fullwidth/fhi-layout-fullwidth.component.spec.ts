import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiLayoutFullwidthComponent } from './fhi-layout-fullwidth.component';

describe('FhiLayoutFullwidthComponent', () => {
  let component: FhiLayoutFullwidthComponent;
  let fixture: ComponentFixture<FhiLayoutFullwidthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FhiLayoutFullwidthComponent],
    });
    fixture = TestBed.createComponent(FhiLayoutFullwidthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
