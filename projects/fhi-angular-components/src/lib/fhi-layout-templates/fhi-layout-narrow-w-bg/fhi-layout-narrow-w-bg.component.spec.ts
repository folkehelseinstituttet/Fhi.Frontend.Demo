import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiLayoutNarrowWBgComponent } from './fhi-layout-narrow-w-bg.component';

describe('FhiLayoutNarrowWBgComponent', () => {
  let component: FhiLayoutNarrowWBgComponent;
  let fixture: ComponentFixture<FhiLayoutNarrowWBgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FhiLayoutNarrowWBgComponent],
    });
    fixture = TestBed.createComponent(FhiLayoutNarrowWBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
