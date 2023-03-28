import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiAngularTreeViewBuilderComponent } from './fhi-angular-tree-view-builder.component';

describe('FhiAngularTreeViewBuilderComponent', () => {
  let component: FhiAngularTreeViewBuilderComponent;
  let fixture: ComponentFixture<FhiAngularTreeViewBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhiAngularTreeViewBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FhiAngularTreeViewBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
