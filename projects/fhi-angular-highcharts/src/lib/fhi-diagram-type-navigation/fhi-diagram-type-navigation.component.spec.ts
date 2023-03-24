import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiDiagramTypeNavigationComponent } from './fhi-diagram-type-navigation.component';

describe('FhiDiagramTypeNavigationComponent', () => {
  let component: FhiDiagramTypeNavigationComponent;
  let fixture: ComponentFixture<FhiDiagramTypeNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhiDiagramTypeNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FhiDiagramTypeNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
