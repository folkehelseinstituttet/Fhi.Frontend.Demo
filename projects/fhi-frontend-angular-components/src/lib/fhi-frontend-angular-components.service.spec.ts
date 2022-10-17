import { TestBed } from '@angular/core/testing';

import { FhiFrontendAngularComponentsService } from './fhi-frontend-angular-components.service';

describe('FhiFrontendAngularComponentsService', () => {
  let service: FhiFrontendAngularComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FhiFrontendAngularComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
