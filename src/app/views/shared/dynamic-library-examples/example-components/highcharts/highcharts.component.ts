import { Component, Input, OnInit } from '@angular/core';

import { MockDataService } from './mock-data.service';
import { MockData } from './mock-data';

import {
  FhiDiagramOptions,
  FhiDiagramSerie,
  FhiDiagramTypeIds,
} from '@folkehelseinstituttet/angular-highcharts';

import { LibraryItemsShared } from '../../../models/library-item.model';

@Component({
  selector: 'app-highcharts',
  templateUrl: './highcharts.component.html',
})
export class HighchartsComponent implements OnInit {
  @Input() itemId!: string;
  @Input() items!: LibraryItemsShared;

  dataIsLoading = false;
  dataIsLoaded = false;
  diagramOptions!: FhiDiagramOptions;

  constructor(private highchartsDataService: MockDataService) {}

  ngOnInit() {
    if (this.itemId === this.items.HighchartsWithoutMenu.id) {
      this.loadData(MockData.TwoSeriesAar);
    } else if (this.itemId === this.items.HighchartsAllInclusive.id) {
      this.loadData(MockData.OneSerieFylke);
    } else if (this.itemId === this.items.HighchartsWithMenu.id) {
      this.loadData(MockData.MultipleSeriesAar);
    }
  }

  loadData(dataSetIndex: number) {
    this.dataIsLoading = true;
    this.dataIsLoaded = false;

    if (dataSetIndex === MockData.TwoSeriesAar) {
      this.highchartsDataService.getData(MockData.TwoSeriesAar).subscribe({
        next: (data: FhiDiagramSerie[]) => {
          this.diagramOptions = {
            diagramTypeId: 'line',
            title: 'Dødsfall etter årsak, 2008 - 2018',
            series: data,
          };
          this.dataIsLoading = false;
          this.dataIsLoaded = true;
        },
        error: (e) => console.error(e),
      });
    } else if (dataSetIndex === MockData.MultipleSeriesAar) {
      this.highchartsDataService.getData(MockData.MultipleSeriesAar).subscribe({
        next: (data: FhiDiagramSerie[]) => {
          this.diagramOptions = {
            title: 'Dødsfall etter årsak, 2017 - 2021',
            series: data,
            diagramTypeNavId: 'default',
            tableOrientation: 'seriesAsColumns',
          };
          this.dataIsLoading = false;
          this.dataIsLoaded = true;
        },
        error: (e) => console.error(e),
      });
    } else if (dataSetIndex === MockData.OneSerieFylke) {
      this.highchartsDataService.getData(MockData.OneSerieFylke).subscribe({
        next: (data: FhiDiagramSerie[]) => {
          this.diagramOptions = {
            title: 'Dødsfall hjerte og kar, fordelt på fylke, 2016 - 2020',
            series: data,
            // diagramTypeId: 'pie',
            diagramTypeId: 'map',
            diagramTypeNavId: 'default',
            flags: [
              {
                symbol: '..',
                label: 'Manglende data',
              },
              {
                symbol: '.',
                label: 'Lar seg ikke beregne',
              },
              {
                symbol: ':',
                label: 'Anonymisert',
              },
            ],
            creditsHref: 'https://www.fhi.no/hn/folkehelse/artikler/oppdateringer',
            creditsText: 'Nøkkeltall for folkehelse',
            disclaimer: 'Disse dataene kan inneholde feil.',
            lastUpdated: '06.06.2023',
            mapTypeId: 'mapFylker',
            openSource: false,
            showFullScreenButton: true,
            additionalLink: {
              icon: 'info-circle',
              link: 'highcharts-without-menu',
              linkText: 'Om dataene',
              linkType: 'fragment',
            },
          };
          this.dataIsLoading = false;
          this.dataIsLoaded = true;
        },
        error: (e) => console.error(e),
      });
    }
  }

  onDiagramTypeNavigation(diagramTypeId: FhiDiagramTypeIds) {
    this.diagramOptions = {
      ...this.diagramOptions,
      diagramTypeId: diagramTypeId,
    };
  }
}
