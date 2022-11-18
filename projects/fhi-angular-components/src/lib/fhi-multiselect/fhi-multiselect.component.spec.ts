import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiMultiselectComponent } from './fhi-multiselect.component';

describe('FhiMultiselectComponent', () => {
  let component: FhiMultiselectComponent;
  let fixture: ComponentFixture<FhiMultiselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhiMultiselectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FhiMultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
