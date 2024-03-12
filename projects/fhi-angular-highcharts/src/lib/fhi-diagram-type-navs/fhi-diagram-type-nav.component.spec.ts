import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiDiagramTypeNavComponent } from './fhi-diagram-type-nav.component';
import { DiagramTypeService } from '../services/diagram-type.service';

describe('FhiDiagramTypeNavComponent', () => {
  let component: FhiDiagramTypeNavComponent;
  let fixture: ComponentFixture<FhiDiagramTypeNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FhiDiagramTypeNavComponent],
      providers: [{ provide: DiagramTypeService }],
    }).compileComponents();

    fixture = TestBed.createComponent(FhiDiagramTypeNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
