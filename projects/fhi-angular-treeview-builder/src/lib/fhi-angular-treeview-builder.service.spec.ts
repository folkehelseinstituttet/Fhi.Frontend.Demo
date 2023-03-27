import { TestBed } from '@angular/core/testing';

import { FhiAngularTreeviewBuilderService } from './fhi-angular-treeview-builder.service';

describe('FhiAngularTreeviewBuilderService', () => {
  let service: FhiAngularTreeviewBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FhiAngularTreeviewBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
