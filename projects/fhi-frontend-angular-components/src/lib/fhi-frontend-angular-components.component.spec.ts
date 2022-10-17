import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiFrontendAngularComponentsComponent } from './fhi-frontend-angular-components.component';

describe('FhiFrontendAngularComponentsComponent', () => {
  let component: FhiFrontendAngularComponentsComponent;
  let fixture: ComponentFixture<FhiFrontendAngularComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhiFrontendAngularComponentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FhiFrontendAngularComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
