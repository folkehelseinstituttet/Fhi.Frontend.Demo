import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiAutosuggestComponent } from './fhi-autosuggest.component';
import { FormsModule } from '@angular/forms';
import { FhiAutosuggestModule } from './fhi-autosuggest.module';

describe('FhiAutosuggestComponent', () => {
  let component: FhiAutosuggestComponent;
  let fixture: ComponentFixture<FhiAutosuggestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FhiAutosuggestComponent],
      imports: [FormsModule, FhiAutosuggestModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FhiAutosuggestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
