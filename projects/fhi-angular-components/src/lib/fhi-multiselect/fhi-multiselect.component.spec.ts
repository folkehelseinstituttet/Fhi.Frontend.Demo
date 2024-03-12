import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiMultiselectComponent } from './fhi-multiselect.component';
import { FhiMultiselectModule } from './fhi-multiselect.module';
import { FormsModule } from '@angular/forms';

describe('FhiMultiselectComponent', () => {
  let component: FhiMultiselectComponent;
  let fixture: ComponentFixture<FhiMultiselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FhiMultiselectComponent],
      imports: [FormsModule, FhiMultiselectModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FhiMultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
