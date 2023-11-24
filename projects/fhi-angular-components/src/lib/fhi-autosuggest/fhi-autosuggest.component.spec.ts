import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiAutosuggestComponent } from './fhi-autosuggest.component';

describe('FhiAutosuggestComponent', () => {
  let component: FhiAutosuggestComponent;
  let fixture: ComponentFixture<FhiAutosuggestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FhiAutosuggestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FhiAutosuggestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
