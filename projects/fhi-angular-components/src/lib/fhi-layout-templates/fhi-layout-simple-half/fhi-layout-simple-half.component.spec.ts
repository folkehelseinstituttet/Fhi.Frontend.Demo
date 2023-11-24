import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiLayoutSimpleHalfComponent } from './fhi-layout-simple-half.component';

describe('FhiLayoutSimpleHalfComponent', () => {
  let component: FhiLayoutSimpleHalfComponent;
  let fixture: ComponentFixture<FhiLayoutSimpleHalfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FhiLayoutSimpleHalfComponent],
    });
    fixture = TestBed.createComponent(FhiLayoutSimpleHalfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
