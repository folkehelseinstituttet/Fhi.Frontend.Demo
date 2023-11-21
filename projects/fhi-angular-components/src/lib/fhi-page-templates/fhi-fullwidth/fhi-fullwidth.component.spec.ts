import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiFullwidthComponent } from './fhi-fullwidth.component';

describe('FhiFullwidthComponent', () => {
  let component: FhiFullwidthComponent;
  let fixture: ComponentFixture<FhiFullwidthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FhiFullwidthComponent],
    });
    fixture = TestBed.createComponent(FhiFullwidthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
