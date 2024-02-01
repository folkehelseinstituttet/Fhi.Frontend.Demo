import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiTreeViewSelectionRadioComponent } from './fhi-tree-view-selection-radio.component';

describe('FhiTreeViewSelectionRadioComponent', () => {
  let component: FhiTreeViewSelectionRadioComponent;
  let fixture: ComponentFixture<FhiTreeViewSelectionRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FhiTreeViewSelectionRadioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FhiTreeViewSelectionRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
