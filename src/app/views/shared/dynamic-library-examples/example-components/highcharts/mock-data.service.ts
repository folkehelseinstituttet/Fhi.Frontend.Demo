/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MockData } from './mock-data.enum';

import { DodsfallEtterAarsak_2008_2018 } from './mock-data/1.dodsfall-etter-aarsak-2008-2018';
import { DodsfallEtterAarsak_2017_2021 } from './mock-data/2.dodsfall-etter-aarsak-2017-2021';
import { DodsfallEtterAarsak_2017 } from './mock-data/3.dodsfall-etter-aarsak-2017';
import { DodsfallEtterAarsak_2017_2021_Hjerteinfarkt_Mann } from './mock-data/4.dodsfall-etter-aarsak-2017-2021-hjerteinfarkt-mann';
import { DodsfallHjerteOgKarEtterFylke } from './mock-data/5.dodsfall-hjerte-og-kar-etter-fylke';
import { BefolkningInndelingPr2024_antall } from './mock-data/6.befolkning-inndeling-pr-2024-antall';
import { BefolkningInndelingPr2024_andel } from './mock-data/7.befolkning-inndeling-pr-2024-andel';
import { AgensAntallOgAndel } from './mock-data/8.agens-antall-og-andel';
import { PrikkedeDataMedToSerier } from './mock-data/9.prikkede-data-med-to-serier';
import { Valgdeltagelse2015 } from './mock-data/10.Valgdeltagelse-2015';

// Data for testing/debugging while developing locally, do not show in dev or prod.
import { TestData } from './mock-data/test-data-7';
import { TestData11 } from './mock-data/test-data-11';
import { TestData12 } from './mock-data/test-data-12';

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
        case MockData.DodsfallEtterAarsak_2017:
          dataSet.next(DodsfallEtterAarsak_2017);
          break;
        case MockData.DodsfallEtterAarsak_2017_2021_Hjerteinfarkt_Mann:
          dataSet.next(DodsfallEtterAarsak_2017_2021_Hjerteinfarkt_Mann);
          break;
        case MockData.DodsfallHjerteOgKarEtterFylke:
          dataSet.next(DodsfallHjerteOgKarEtterFylke);
          break;
        case MockData.BefolkningInndelingPr2024_antall:
          dataSet.next(BefolkningInndelingPr2024_antall);
          break;
        case MockData.BefolkningInndelingPr2024_andel:
          dataSet.next(BefolkningInndelingPr2024_andel);
          break;
        case MockData.AgensAntallOgAndel:
          dataSet.next(AgensAntallOgAndel);
          break;
        case MockData.PrikkedeDataMedToSerier:
          dataSet.next(PrikkedeDataMedToSerier);
          break;
        case MockData.Valgdeltagelse2015:
          dataSet.next(Valgdeltagelse2015);
          break;

        // Data for testing while developing locally, do not show in dev or prod.
        case MockData.TestData:
          dataSet.next(TestData);
          break;
        case MockData.TestData11:
          dataSet.next(TestData11);
          break;
        case MockData.TestData12:
          dataSet.next(TestData12);
          break;
      }
    });
  }
}
