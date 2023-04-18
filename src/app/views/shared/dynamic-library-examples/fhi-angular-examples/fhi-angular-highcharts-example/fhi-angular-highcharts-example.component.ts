import { Component, Input, OnInit } from '@angular/core';

import { MockDataService } from './mock-data.service';
import { MockData } from './mock-data';

import {
  FhiDiagramOptions,
  FhiDiagramTypes,
  FhiDiagramType,
  FhiDiagramTypeNavs,
} from '@folkehelseinstituttet/angular-highcharts';

@Component({
  selector: 'app-fhi-angular-highcharts-example',
  templateUrl: './fhi-angular-highcharts-example.component.html'
})
export class FhiAngularHighchartsExampleComponent implements OnInit {

  @Input() itemId!: string;
  @Input() itemIds!: any;

  dataIsLoading = false;
  dataIsLoaded = false;
  diagramOptions!: FhiDiagramOptions;
  MockData = MockData;

  constructor(private highchartsDataService: MockDataService) {}

  ngOnInit() {
    if (this.itemId === this.itemIds.Highcharts) {
      this.loadData(MockData.TwoSeriesAar);

    } else if (this.itemId === this.itemIds.HighchartsWithMenuAndMap) {
      this.loadData(MockData.OneSerieFylke);

    } else if (this.itemId === this.itemIds.HighchartsWithMenu) {
      this.loadData(MockData.MultipleSeriesAar);
    }
  }

  loadData(dataSetIndex: number) {
    this.dataIsLoading = true;
    this.dataIsLoaded = false;

    if (dataSetIndex === MockData.TwoSeriesAar) {
      this.highchartsDataService.getData(MockData.TwoSeriesAar).subscribe({
        next: (data) => {
          this.diagramOptions = {
            title: "Dødsfall etter årsak, 2008 - 2018",
            data: data,
            // diagramType: FhiDiagramTypes.line,
            diagramType: FhiDiagramTypes.table,
          }
          this.dataIsLoading = false;
          this.dataIsLoaded = true;
        },
        error: (e) => console.error(e),
      });

    } else if (dataSetIndex === MockData.OneSerieFylke) {
      this.highchartsDataService.getData(MockData.OneSerieFylke).subscribe({
        next: (data) => {
          this.diagramOptions = {
            title: "Dødsfall hjerte og kar, fordelt på fylke, 2016 - 2020",
            data: data,
            diagramTypeNav: FhiDiagramTypeNavs.default
          };
          this.dataIsLoading = false;
          this.dataIsLoaded = true;
        },
        error: (e) => console.error(e),
      });

    } else if (dataSetIndex === MockData.MultipleSeriesAar) {
      this.highchartsDataService.getData(MockData.MultipleSeriesAar).subscribe({
        next: (data) => {
          this.diagramOptions = {
            title: "Dødsfall etter årsak, 2017 - 2021",
            data: data,
            diagramTypeNav: FhiDiagramTypeNavs.default
          };
          this.dataIsLoading = false;
          this.dataIsLoaded = true;
        },
        error: (e) => console.error(e),
      });
    }
  }

  onDiagramTypeNav(diagramType: FhiDiagramType) {
    this.diagramOptions = {
      ...this.diagramOptions,
      diagramType: diagramType,
    };
  }
}
