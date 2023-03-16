import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiTreeViewNavigationComponent } from './fhi-tree-view-navigation.component';

describe('FhiTreeViewNavigationComponent', () => {
  let component: FhiTreeViewNavigationComponent;
  let fixture: ComponentFixture<FhiTreeViewNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhiTreeViewNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FhiTreeViewNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
