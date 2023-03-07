import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiTreeviewNavigationComponent } from './fhi-treeview-navigation.component';

describe('FhiTreeviewNavigationComponent', () => {
  let component: FhiTreeviewNavigationComponent;
  let fixture: ComponentFixture<FhiTreeviewNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhiTreeviewNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FhiTreeviewNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
