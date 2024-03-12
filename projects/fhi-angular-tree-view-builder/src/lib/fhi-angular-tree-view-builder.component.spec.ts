import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiAngularTreeViewBuilderComponent } from './fhi-angular-tree-view-builder.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { TreeModule } from '@ali-hm/angular-tree-component';

describe('FhiAngularTreeViewBuilderComponent', () => {
  let component: FhiAngularTreeViewBuilderComponent;
  let fixture: ComponentFixture<FhiAngularTreeViewBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FhiAngularTreeViewBuilderComponent],
      providers: [{ provide: NgbModal }],
      imports: [TreeModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FhiAngularTreeViewBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
