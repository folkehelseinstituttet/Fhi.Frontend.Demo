import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MockData } from './mock-data.enum';
import { DodsfallEtterAarsak_2008_2010 } from './mock-data/1.dodsfall-etter-aarsak-2008-2018';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  getData(dataSetIndex: number): Observable<any> {
    return new Observable<any>((dataSet) => {
      switch (dataSetIndex) {
        case MockData.DodsfallEtterAarsak_2008_2010:
          dataSet.next(DodsfallEtterAarsak_2008_2010);
          break;

        case MockData.OneSerieFylke:
          dataSet.next(this.getDodsfall_r_Fylke_c_Aarsak());
          break;

        case MockData.TwoSeriesAar:
          dataSet.next(this.getDodsfall_r_Ar_c_Aarsak());
          break;

        case MockData.MultipleSeriesAar:
          dataSet.next(this.getDodsfall_r_Ar_c_Aarsak_LG());
          dataSet.next(this.getDummyData());
          // dataSet.next(this.getDataForPowerPoint());
          break;

        default:
          dataSet.next(this.getDodsfall_r_Fylke_c_Aarsak());
          break;
      }
    });
  }

  // ---------
  // Mock data
  // ---------

  private getDodsfall_r_Fylke_c_Aarsak() {
    return [
      {
        name: 'Hjerte- og karsystemet',
        data: [
          {
            name: 'Agder',
            y: ':',
            // "y": 1698
          },
          {
            name: 'Innlandet',
            y: 3360,
          },
          {
            name: 'Møre og Romsdal',
            y: 1909,
          },
          {
            name: 'Nordland',
            y: 1687,
          },
          {
            name: 'Oslo',
            y: '.',
            // "y": 2814
          },
          {
            name: 'Rogaland',
            y: 2143,
          },
          {
            name: 'Troms og Finnmark',
            y: 1566,
          },
          {
            name: 'Trøndelag',
            y: 2839,
          },
          {
            name: 'Vestfold og Telemark',
            y: 3060,
          },
          {
            name: 'Vestland',
            y: 3625,
          },
          {
            name: 'Viken',
            y: 6738,
          },
        ],
      },
    ];
  }

  private getDodsfall_r_Ar_c_Aarsak() {
    return [
      {
        name: ['Hjerte- og karsystemet', 'Kvinne'],
        data: [
          {
            name: '2008',
            y: 7535,
          },
          {
            name: '2009',
            y: 7303,
          },
          {
            name: '2010',
            y: 7038,
          },
          {
            name: '2011',
            y: 6967,
          },
          {
            name: '2012',
            y: 7057,
          },
          {
            name: '2013',
            y: 6581,
          },
          {
            name: '2014',
            y: 6261,
          },
          {
            name: '2015',
            y: 6195,
          },
          {
            name: '2016',
            y: 5817,
          },
          {
            name: '2017',
            y: 5436,
          },
          {
            name: '2018',
            y: 5229,
          },
        ],
      },
      {
        name: 'Hjerte- og karsystemet | Mann',
        data: [
          {
            name: '2008',
            y: 6601,
          },
          {
            name: '2009',
            y: 6224,
          },
          {
            name: '2010',
            y: 6122,
          },
          {
            name: '2011',
            y: 6009,
          },
          {
            name: '2012',
            y: 5978,
          },
          {
            name: '2013',
            y: 5760,
          },
          {
            name: '2014',
            y: 5500,
          },
          {
            name: '2015',
            y: 5457,
          },
          {
            name: '2016',
            y: 5161,
          },
          {
            name: '2017',
            y: 4941,
          },
          {
            name: '2018',
            y: 4857,
          },
        ],
      },
    ];
  }

  private getDodsfall_r_Ar_c_Aarsak_LG() {
    return [
      {
        name: 'Hjerteinfarkt| Kvinne',
        data: [
          {
            name: '2017',
            y: 984,
          },
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            // y: ":",
            y: 660,
          },
        ],
      },
      {
        name: 'Hjerteinfarkt     | Mann',
        data: [
          {
            name: '2017',
            y: 1147,
          },
          {
            name: '2018',
            // y: ":",
            y: 1096,
          },
          {
            name: '2019',
            y: 994,
          },
          {
            name: '2020',
            y: 857,
          },
          {
            name: '2021',
            y: 935,
          },
        ],
      },
      {
        name: 'Annen iskemisk hjertesykdom|Kvinne',
        data: [
          {
            name: '2017',
            y: 567,
          },
          {
            name: '2018',
            y: 603,
            // y: ":",
          },
          {
            name: '2019',
            y: 544,
            // y: ":",
          },
          {
            name: '2020',
            y: 631,
          },
          {
            name: '2021',
            y: 772,
          },
        ],
      },
      {
        name: 'Annen iskemisk hjertesykdom | Mann',
        data: [
          {
            name: '2017',
            y: 862,
          },
          {
            name: '2018',
            y: 866,
          },
          {
            name: '2019',
            y: 870,
          },
          {
            name: '2020',
            y: 949,
          },
          {
            name: '2021',
            y: 1098,
          },
        ],
      },
      {
        name: 'Karsykdommer i hjernen | Kvinne',
        data: [
          {
            name: '2017',
            y: 1372,
          },
          {
            name: '2018',
            y: 1265,
          },
          {
            name: '2019',
            // y: ":",
            y: 1203,
          },
          {
            name: '2020',
            y: 1158,
          },
          {
            name: '2021',
            y: 1145,
          },
        ],
      },
      {
        name: 'Karsykdommer i hjernen | Mann',
        data: [
          {
            name: '2017',
            y: 961,
          },
          {
            name: '2018',
            y: 952,
          },
          {
            name: '2019',
            y: 954,
          },
          {
            name: '2020',
            y: 1005,
          },
          {
            name: '2021',
            y: 960,
          },
        ],
      },
    ];
  }

  private getDummyData() {
    return [
      {
        name: 'Total | Total | a',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Total | Total | b',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Total | Total | c',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Total | Total | d',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Total | Kvinne | a',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Total | Kvinne | b',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Total | Kvinne | c',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Total | Kvinne | d',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Total | Mann | a',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Total | Mann | b',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Total | Mann | c',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: ['Total', 'Mann', 'd'],
        data: [
          {
            name: '2018',
            y: 379,
          },
          {
            name: '2019',
            y: 1086,
          },
          {
            name: '2020',
            y: 523,
          },
          {
            name: '2021',
            y: 908,
          },
        ],
      },
      {
        name: 'Dødsfall av sykdommer | Total | a',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: ':',
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Dødsfall av sykdommer | Total | b',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Dødsfall av sykdommer | Total | c',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Dødsfall av sykdommer | Total | d',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Dødsfall av sykdommer | Kvinne | a',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Dødsfall av sykdommer | Kvinne | b',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Dødsfall av sykdommer | Kvinne | c',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Dødsfall av sykdommer | Kvinne | d',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Dødsfall av sykdommer | Mann | a',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Dødsfall av sykdommer | Mann | b',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Dødsfall av sykdommer | Mann | c',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Dødsfall av sykdommer | Mann | d',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Ytre årsaker | Total | a',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Ytre årsaker | Total | b',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Ytre årsaker | Total | c',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Ytre årsaker | Total | d',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Ytre årsaker | Kvinne | a',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Ytre årsaker | Kvinne | b',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Ytre årsaker | Kvinne | c',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Ytre årsaker | Kvinne | d',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Ytre årsaker | Mann | a',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Ytre årsaker | Mann | b',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Ytre årsaker | Mann | c',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Ytre årsaker | Mann | d',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Mangler dødsmelding | Total | a',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Mangler dødsmelding | Total | b',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Mangler dødsmelding | Total | c',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Mangler dødsmelding | Total | d',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Mangler dødsmelding | Kvinne | a',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Mangler dødsmelding | Kvinne | b',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Mangler dødsmelding | Kvinne | c',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Mangler dødsmelding | Kvinne | d',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Mangler dødsmelding | Mann | a',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Mangler dødsmelding | Mann | b',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Mangler dødsmelding | Mann | c',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
      {
        name: 'Mangler dødsmelding | Mann | d',
        data: [
          {
            name: '2018',
            y: 880,
          },
          {
            name: '2019',
            y: 818,
          },
          {
            name: '2020',
            y: 718,
          },
          {
            name: '2021',
            y: 660,
          },
        ],
      },
    ];
  }

  // Serier for "Befolkning (antall og andel) - inndeling per 1.1.2024"
  private getDataForPowerPoint() {
    return [
      {
        name: 'Hele landet | Alle aldre',
        data: [
          { name: '2016', y: 5213985 },
          { name: '2017', y: 5258317 },
          { name: '2018', y: 5295619 },
          { name: '2019', y: 5328212 },
          { name: '2020', y: 5367580 },
          { name: '2021', y: 5391369 },
          { name: '2022', y: 5425270 },
          { name: '2023', y: 5488984 },
        ],
      },
      {
        name: 'Hele landet | 0-17 år',
        data: [
          { name: '2016', y: 1127402 },
          { name: '2017', y: 1131051 },
          { name: '2018', y: 1129007 },
          { name: '2019', y: 1122508 },
          { name: '2020', y: 1118608 },
          { name: '2021', y: 1111690 },
          { name: '2022', y: 1108523 },
          { name: '2023', y: 1112191 },
        ],
      },
      {
        name: 'Hele landet | 80 år +',
        data: [
          { name: '2016', y: 220025 },
          { name: '2017', y: 220980 },
          { name: '2018', y: 222752 },
          { name: '2019', y: 225999 },
          { name: '2020', y: 230710 },
          { name: '2021', y: 236407 },
          { name: '2022', y: 240293 },
          { name: '2023', y: 246360 },
        ],
      },
    ];
  }
}
