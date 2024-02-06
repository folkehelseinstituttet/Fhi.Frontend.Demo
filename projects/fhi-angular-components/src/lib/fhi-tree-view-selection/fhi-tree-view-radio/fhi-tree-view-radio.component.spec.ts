import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiTreeViewRadioComponent } from './fhi-tree-view-radio.component';

describe('FhiTreeViewRadioComponent', () => {
  let component: FhiTreeViewRadioComponent;
  let fixture: ComponentFixture<FhiTreeViewRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FhiTreeViewRadioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FhiTreeViewRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
