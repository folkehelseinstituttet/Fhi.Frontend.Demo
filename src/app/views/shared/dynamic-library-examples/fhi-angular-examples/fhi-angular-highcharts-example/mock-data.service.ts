import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MockData } from './mock-data';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  getData(dataSetIndex: number): Observable<any> {
    return new Observable<any>(observer => {
      if (dataSetIndex === MockData.TwoSeriesAar) {
        observer.next(this.dodsfall_r_Ar_c_Aarsak);
      } else {
        observer.next(this.dodsfall_r_Fylke_c_Aarsak);
      }
    });
  }


  // ---------
  // Mock data
  // ---------

  private dodsfall_r_Fylke_c_Aarsak = [
    {
        "name": "Hjerte- og karsystemet",
        "data": [
            {
                "name": "Agder",
                "y": 1698
            },
            {
                "name": "Innlandet",
                "y": 3360
            },
            {
                "name": "Møre og Romsdal",
                "y": 1909
            },
            {
                "name": "Nordland",
                "y": 1687
            },
            {
                "name": "Oslo",
                "y": 2814
            },
            {
                "name": "Rogaland",
                "y": 2143
            },
            {
                "name": "Troms og Finnmark",
                "y": 1566
            },
            {
                "name": "Trøndelag",
                "y": 2839
            },
            {
                "name": "Vestfold og Telemark",
                "y": 3060
            },
            {
                "name": "Vestland",
                "y": 3625
            },
            {
                "name": "Viken",
                "y": 6738
            }
        ]
    }
  ];

  private dodsfall_r_Ar_c_Aarsak = [
    {
          "name": "Hjerte- og karsystemet, Kvinne",
          "data": [
              {
                  "name": "2008",
                  "y": 7535
              },
              {
                  "name": "2009",
                  "y": 7303
              },
              {
                  "name": "2010",
                  "y": 7038
              },
              {
                  "name": "2011",
                  "y": 6967
              },
              {
                  "name": "2012",
                  "y": 7057
              },
              {
                  "name": "2013",
                  "y": 6581
              },
              {
                  "name": "2014",
                  "y": 6261
              },
              {
                  "name": "2015",
                  "y": 6195
              },
              {
                  "name": "2016",
                  "y": 5817
              },
              {
                  "name": "2017",
                  "y": 5436
              },
              {
                  "name": "2018",
                  "y": 5229
              }
          ]
      },
      {
          "name": "Hjerte- og karsystemet, Mann",
          "data": [
              {
                  "name": "2008",
                  "y": 6601
              },
              {
                  "name": "2009",
                  "y": 6224
              },
              {
                  "name": "2010",
                  "y": 6122
              },
              {
                  "name": "2011",
                  "y": 6009
              },
              {
                  "name": "2012",
                  "y": 5978
              },
              {
                  "name": "2013",
                  "y": 5760
              },
              {
                  "name": "2014",
                  "y": 5500
              },
              {
                  "name": "2015",
                  "y": 5457
              },
              {
                  "name": "2016",
                  "y": 5161
              },
              {
                  "name": "2017",
                  "y": 4941
              },
              {
                  "name": "2018",
                  "y": 4857
              }
          ]
      }
  ];

}
