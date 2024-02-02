import { Component, Input, OnInit } from '@angular/core';

import { MockDataService } from './mock-data.service';
import { MockData } from './mock-data.enum';

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
      this.loadDodsfallEtterAarsak_2008_2018();
    } else if (this.itemId === this.items.HighchartsWithMenu.id) {
      this.loadData(MockData.MultipleSeriesAar);
    } else if (this.itemId === this.items.HighchartsAllInclusive.id) {
      this.loadDodsfallHjerteOgKarEtterFylke();
    }
  }

  loadData(dataSetIndex: number) {
    this.dataIsLoading = true;
    this.dataIsLoaded = false;

    if (dataSetIndex === MockData.MultipleSeriesAar) {
      this.highchartsDataService.getData(MockData.MultipleSeriesAar).subscribe({
        next: (data: FhiDiagramSerie[]) => {
          this.diagramOptions = {
            // title: 'Dødsfall etter årsak, 2017 - 2021',
            title: 'Befolkning (antall og andel) - inndeling per 1.1.2024',
            series: data,
            diagramTypeNavId: 'default',
            tableOrientation: 'seriesAsColumns',
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

  private loadDodsfallEtterAarsak_2008_2018() {
    this.dataIsLoading = true;
    this.dataIsLoaded = false;

    this.highchartsDataService.getData(MockData.DodsfallEtterAarsak_2008_2018).subscribe({
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
  }

  private loadDodsfallHjerteOgKarEtterFylke() {
    this.highchartsDataService.getData(MockData.DodsfallHjerteOgKarEtterFylke).subscribe({
      next: (data: FhiDiagramSerie[]) => {
        this.diagramOptions = {
          title: 'Dødsfall hjerte og kar, fordelt på fylke',
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
        };
        this.dataIsLoading = false;
        this.dataIsLoaded = true;
      },
      error: (e) => console.error(e),
    });
  }
}
