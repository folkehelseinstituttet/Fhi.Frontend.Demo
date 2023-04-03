import { Component, Input, OnInit } from "@angular/core";

import { MockDataService } from "./mock-data.service";
import { MockData } from "./mock-data";

import {
  FhiDiagramOptions,
  FhiDiagramTypes,
  FhiDiagramType,
  FhiDiagramTypeNavs,
} from "@folkehelseinstituttet/angular-highcharts";

@Component({
  selector: "app-fhi-angular-highcharts-example",
  templateUrl: "./fhi-angular-highcharts-example.component.html",
})
export class FhiAngularHighchartsExampleComponent implements OnInit {
  @Input() itemId!: string;
  @Input() itemIds!: any;

  dataIsLoading = false;
  dataIsLoaded = false;
  diagramOptions: FhiDiagramOptions = {
    title: "Dødsfall etter årsak, 2008 - 2018",
    diagramType: FhiDiagramTypes.table,
    data: [],
  };

  constructor(private highchartsDataService: MockDataService) {}

  ngOnInit() {
    this.dataIsLoading = true;
    this.dataIsLoaded = false;

    if (this.itemId === this.itemIds.Highcharts) {
      this.highchartsDataService.getData(MockData.TwoSeriesAar).subscribe({
        next: (data) => {
          this.diagramOptions = {
            ...this.diagramOptions,
            data: data,
            diagramType: FhiDiagramTypes.column,
          }
          this.dataIsLoading = false;
          this.dataIsLoaded = true;
        },
        error: (e) => console.error(e),
      });

    } else if (this.itemId === this.itemIds.HighchartsWithMenu) {
      // this.highchartsDataService.getData(MockData.OneSerieFylke).subscribe({
      this.highchartsDataService.getData(MockData.MultipleSeriesAar).subscribe({
        next: (data) => {
          this.diagramOptions = {
            ...this.diagramOptions,
            data: data,
            diagramTypeNav: FhiDiagramTypeNavs.default
          };
          this.dataIsLoading = false;
          this.dataIsLoaded = true;
        },
        error: (e) => console.error(e),
      });

    } else {
      this.highchartsDataService.getData(MockData.MultipleSeriesAar).subscribe({
        next: (data) => {
          this.diagramOptions = {
            ...this.diagramOptions,
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
