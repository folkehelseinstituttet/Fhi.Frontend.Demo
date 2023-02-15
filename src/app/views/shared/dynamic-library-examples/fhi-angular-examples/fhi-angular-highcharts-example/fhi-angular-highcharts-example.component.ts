import { Component, OnInit } from '@angular/core';

import { MockDataService } from './mock-data.service';
import { MockData } from './mock-data';


// TODO: interface FhiDiagramConfig must be exposed by the npm-package
interface FhiDiagramConfig {
  data: any;
  title: string;
  defaultDiagramType: number;
  disclaimer: string;
  lastUpdated: string;
  creditsHref: string;
  creditsText: string;
}

@Component({
  selector: 'app-fhi-angular-highcharts-example',
  templateUrl: './fhi-angular-highcharts-example.component.html'
})
export class FhiAngularHighchartsExampleComponent implements OnInit {

  dataIsLoading = false;
  dataIsLoaded = false;
  diagramConfig!: FhiDiagramConfig;

  constructor(private highchartsDataService: MockDataService) { }

  ngOnInit() {
    this.dataIsLoading = true;
    this.dataIsLoaded = false;
    this.highchartsDataService.getData(MockData.TwoSeriesAar)
      .subscribe({
        next: (data) => {
          this.diagramConfig = {
            title: 'Dødsfall etter årsak, 2008 - 2018',
            data: data,
            defaultDiagramType: 1,
            disclaimer: 'Det kan være feil i disse dataene.',
            lastUpdated: 'Juni 2021',
            creditsHref: 'https://www.fhi.no',
            creditsText: 'Kilde: Dødsårsaksregisteret, FHI'
          };
          this.dataIsLoading = false;
          this.dataIsLoaded = true;
        },
        error: (e) => console.error(e)
      });
  }

}
