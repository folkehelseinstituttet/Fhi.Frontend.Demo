import { TestBed } from '@angular/core/testing';

import { FhiAngularHighchartsService } from './fhi-angular-highcharts.service';

describe('FhiAngularHighchartsService', () => {
  let service: FhiAngularHighchartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FhiAngularHighchartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
