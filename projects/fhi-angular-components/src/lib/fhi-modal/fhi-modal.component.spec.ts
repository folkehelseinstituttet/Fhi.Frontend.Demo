import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiModalComponent } from './fhi-modal.component';

describe('FhiModalComponent', () => {
  let component: FhiModalComponent;
  let fixture: ComponentFixture<FhiModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FhiModalComponent],
    });
    fixture = TestBed.createComponent(FhiModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
