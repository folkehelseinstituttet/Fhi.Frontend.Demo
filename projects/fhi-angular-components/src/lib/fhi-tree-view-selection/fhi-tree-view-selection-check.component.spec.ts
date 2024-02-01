import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiTreeViewSelectionCheckComponent } from './fhi-tree-view-selection-check.component';

describe('FhiTreeViewSelectionCheckComponent', () => {
  let component: FhiTreeViewSelectionCheckComponent;
  let fixture: ComponentFixture<FhiTreeViewSelectionCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FhiTreeViewSelectionCheckComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FhiTreeViewSelectionCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
