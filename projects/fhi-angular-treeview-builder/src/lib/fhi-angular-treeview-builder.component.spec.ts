import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiAngularTreeviewBuilderComponent } from './fhi-angular-treeview-builder.component';

describe('FhiAngularTreeviewBuilderComponent', () => {
  let component: FhiAngularTreeviewBuilderComponent;
  let fixture: ComponentFixture<FhiAngularTreeviewBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhiAngularTreeviewBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FhiAngularTreeviewBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
