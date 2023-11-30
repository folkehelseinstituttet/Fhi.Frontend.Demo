import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiLayoutComponent } from './fhi-layout.component';

describe('FhiLayoutComponent', () => {
  let component: FhiLayoutComponent;
  let fixture: ComponentFixture<FhiLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FhiLayoutComponent],
    });
    fixture = TestBed.createComponent(FhiLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
