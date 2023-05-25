import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiTreeViewSelectionComponent } from './fhi-tree-view-selection.component';

describe('FhiTreeViewSelectionComponent', () => {
  let component: FhiTreeViewSelectionComponent;
  let fixture: ComponentFixture<FhiTreeViewSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhiTreeViewSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FhiTreeViewSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
