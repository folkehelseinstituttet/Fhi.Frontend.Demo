import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { MockData } from "./mock-data";

@Injectable({
  providedIn: "root",
})
export class MockDataService {
  getData(dataSetIndex: number): Observable<any> {
    return new Observable<any>((dataSet) => {
      switch (dataSetIndex) {
        case MockData.OneSerieFylke:
          dataSet.next(this.dodsfall_r_Fylke_c_Aarsak);
          break;

        case MockData.TwoSeriesAar:
          dataSet.next(this.dodsfall_r_Ar_c_Aarsak);
          break;

        case MockData.MultipleSeriesAar:
          dataSet.next(this.dodsfall_r_Ar_c_Aarsak_LG);
          break;

        default:
          dataSet.next(this.dodsfall_r_Fylke_c_Aarsak);
          break;
      }
    });
  }

  // ---------
  // Mock data
  // ---------

  // TODO: remove all flags after all testing is done

  private dodsfall_r_Fylke_c_Aarsak = [
    {
      name: "Hjerte- og karsystemet",
      data: [
        {
          name: "Agder",
          y: ":",
          // "y": 1698
        },
        {
          name: "Innlandet",
          y: 3360,
        },
        {
          name: "Møre og Romsdal",
          y: 1909,
        },
        {
          name: "Nordland",
          y: 1687,
        },
        {
          name: "Oslo",
          y: ".",
          // "y": 2814
        },
        {
          name: "Rogaland",
          y: 2143,
        },
        {
          name: "Troms og Finnmark",
          y: 1566,
        },
        {
          name: "Trøndelag",
          y: 2839,
        },
        {
          name: "Vestfold og Telemark",
          y: 3060,
        },
        {
          name: "Vestland",
          y: 3625,
        },
        {
          name: "Viken",
          y: 6738,
        },
      ],
    },
  ];

  private dodsfall_r_Ar_c_Aarsak = [
    {
      name: "Hjerte- og karsystemet| Kvinne",
      data: [
        {
          name: "2008",
          y: 7535,
        },
        {
          name: "2009",
          y: 7303,
        },
        {
          name: "2010",
          y: 7038,
        },
        {
          name: "2011",
          y: 6967,
        },
        {
          name: "2012",
          y: 7057,
        },
        {
          name: "2013",
          y: 6581,
        },
        {
          name: "2014",
          y: 6261,
        },
        {
          name: "2015",
          y: 6195,
        },
        {
          name: "2016",
          y: 5817,
        },
        {
          name: "2017",
          y: 5436,
        },
        {
          name: "2018",
          y: 5229,
        },
      ],
    },
    {
      name: "Hjerte- og karsystemet | Mann",
      data: [
        {
          name: "2008",
          y: 6601,
        },
        {
          name: "2009",
          y: 6224,
        },
        {
          name: "2010",
          y: 6122,
        },
        {
          name: "2011",
          y: 6009,
        },
        {
          name: "2012",
          y: 5978,
        },
        {
          name: "2013",
          y: 5760,
        },
        {
          name: "2014",
          y: 5500,
        },
        {
          name: "2015",
          y: 5457,
        },
        {
          name: "2016",
          y: 5161,
        },
        {
          name: "2017",
          y: 4941,
        },
        {
          name: "2018",
          y: 4857,
        },
      ],
    },
  ];

  private dodsfall_r_Ar_c_Aarsak_LG = [
    {
      name: "Hjerteinfarkt| Kvinne",
      stack: "Kvinne",
      // "colorIndex": 0,
      data: [
        {
          name: "2017",
          y: 984,
        },
        {
          name: "2018",
          y: 880,
        },
        {
          name: "2019",
          y: 818,
        },
        {
          name: "2020",
          y: 718,
        },
        {
          name: "2021",
          y: ":",
          // "y": 660
        },
      ],
    },
    {
      name: "Hjerteinfarkt | Mann",
      stack: "Mann",
      // "linkedTo": ":previous",
      // "colorIndex": 0,
      data: [
        {
          name: "2017",
          y: 1147,
        },
        {
          name: "2018",
          y: ":",
          // "y": 1096
        },
        {
          name: "2019",
          y: 994,
        },
        {
          name: "2020",
          y: 857,
        },
        {
          name: "2021",
          y: 935,
        },
      ],
    },
    {
      name: "Annen iskemisk hjertesykdom|Kvinne",
      stack: "Kvinne",
      // "colorIndex": 1,
      data: [
        {
          name: "2017",
          y: 567,
        },
        {
          name: "2018",
          // "y": 603
          y: ":",
        },
        {
          name: "2019",
          // "y": 544
          y: ":",
        },
        {
          name: "2020",
          y: 631,
        },
        {
          name: "2021",
          y: 772,
        },
      ],
    },
    {
      name: "Annen iskemisk hjertesykdom | Mann",
      stack: "Mann",
      // "linkedTo": ":previous",
      // "colorIndex": 1,
      data: [
        {
          name: "2017",
          y: 862,
        },
        {
          name: "2018",
          y: 866,
        },
        {
          name: "2019",
          y: 870,
        },
        {
          name: "2020",
          y: 949,
        },
        {
          name: "2021",
          y: 1098,
        },
      ],
    },
    {
      name: "Karsykdommer i hjernen | Kvinne",
      stack: "Kvinne",
      // "colorIndex": 2,
      data: [
        {
          name: "2017",
          y: 1372,
        },
        {
          name: "2018",
          y: 1265,
        },
        {
          name: "2019",
          y: ":",
          // "y": 1203
        },
        {
          name: "2020",
          y: 1158,
        },
        {
          name: "2021",
          y: 1145,
        },
      ],
    },
    {
      name: "Karsykdommer i hjernen | Mann",
      stack: "Mann",
      // "linkedTo": ":previous",
      // "colorIndex": 2,
      data: [
        {
          name: "2017",
          y: 961,
        },
        {
          name: "2018",
          y: 952,
        },
        {
          name: "2019",
          y: 954,
        },
        {
          name: "2020",
          y: 1005,
        },
        {
          name: "2021",
          y: 960,
        },
      ],
    },
  ];
}
