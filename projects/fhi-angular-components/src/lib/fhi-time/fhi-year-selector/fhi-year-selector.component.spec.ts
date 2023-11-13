import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiYearSelectorComponent } from './fhi-year-selector.component';

describe('FhiYearSelectorComponent', () => {
  let component: FhiYearSelectorComponent;
  let fixture: ComponentFixture<FhiYearSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FhiYearSelectorComponent]
    });
    fixture = TestBed.createComponent(FhiYearSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
