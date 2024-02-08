/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MockData } from './mock-data.enum';

import { DodsfallEtterAarsak_2008_2018 } from './mock-data/1.dodsfall-etter-aarsak-2008-2018';
import { DodsfallEtterAarsak_2017_2021 } from './mock-data/2.dodsfall-etter-aarsak-2017-2021';
import { DodsfallHjerteOgKarEtterFylke } from './mock-data/3.dodsfall-hjerte-og-kar-etter-fylke';
// import { TestData } from './mock-data/test-data-1';
// import { TestData } from './mock-data/test-data-2';
// import { TestData } from './mock-data/test-data-3';
// import { TestData } from './mock-data/test-data-4';
import { TestData } from './mock-data/test-data-5';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  getData(dataSetIndex: number): Observable<any> {
    return new Observable<any>((dataSet) => {
      switch (dataSetIndex) {
        case MockData.DodsfallEtterAarsak_2008_2018:
          dataSet.next(DodsfallEtterAarsak_2008_2018);
          break;

        case MockData.DodsfallEtterAarsak_2017_2021:
          dataSet.next(DodsfallEtterAarsak_2017_2021);
          break;

        case MockData.DodsfallHjerteOgKarEtterFylke:
          dataSet.next(DodsfallHjerteOgKarEtterFylke);
          break;

        // Data for testing while developing locally, do not show in dev or prod.
        case MockData.TestData:
          dataSet.next(TestData);
          // dataSet.next(DodsfallEtterAarsak_2008_2018);
          // dataSet.next(DodsfallEtterAarsak_2017_2021);
          // dataSet.next(DodsfallHjerteOgKarEtterFylke);
          break;
      }
    });
  }
}
