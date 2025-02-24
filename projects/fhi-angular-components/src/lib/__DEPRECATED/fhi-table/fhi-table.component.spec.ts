import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiTableComponent } from './fhi-table.component';

describe('FhiTableComponent', () => {
  let component: FhiTableComponent;
  let fixture: ComponentFixture<FhiTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FhiTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FhiTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
