import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiTreeViewCheckboxComponent } from './fhi-tree-view-checkbox.component';

describe('FhiTreeViewCheckboxComponent', () => {
  let component: FhiTreeViewCheckboxComponent;
  let fixture: ComponentFixture<FhiTreeViewCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FhiTreeViewCheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FhiTreeViewCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
