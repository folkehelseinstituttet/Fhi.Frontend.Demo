import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiWeekSelectorComponent } from './fhi-week-selector.component';

describe('FhiWeekSelectorComponent', () => {
  let component: FhiWeekSelectorComponent;
  let fixture: ComponentFixture<FhiWeekSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhiWeekSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FhiWeekSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
