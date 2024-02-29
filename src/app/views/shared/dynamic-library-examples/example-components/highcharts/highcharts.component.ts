import { Component, Input, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';

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

  constructor(
    private highchartsDataService: MockDataService,
    private viewportScroller: ViewportScroller,
  ) {}

  ngOnInit() {
    this.dataIsLoading = true;
    this.dataIsLoaded = false;

    if (this.itemId === this.items.HighchartsWithoutMenu.id) {
      this.getDodsfallEtterAarsak_2008_2018();
    } else if (this.itemId === this.items.HighchartsWithMenu.id) {
      this.getDodsfallEtterAarsak_2017_2021();
    } else if (this.itemId === this.items.HighchartsAllInclusive.id) {
      this.getDodsfallHjerteOgKarEtterFylke();
      // this.getTestData(); // Data for testing while developing locally, do not show in dev or prod.
    }
  }

  onDiagramTypeNavigation(diagramTypeId: FhiDiagramTypeIds) {
    this.diagramOptions = {
      ...this.diagramOptions,
      diagramTypeId: diagramTypeId,
    };
  }

  onClickFilterDataset(value: string) {
    if (value === '2017') {
      this.getDodsfallEtterAarsak_2017();
    } else {
      this.getDodsfallEtterAarsak_2017_2021();
    }
  }

  onMetadataButtonClick() {
    this.viewportScroller.scrollToAnchor('om-dataene');
  }

  private getDodsfallEtterAarsak_2008_2018() {
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

  private getDodsfallEtterAarsak_2017_2021() {
    this.highchartsDataService.getData(MockData.DodsfallEtterAarsak_2017_2021).subscribe({
      next: (data: FhiDiagramSerie[]) => {
        this.diagramOptions = {
          title: 'Dødsfall etter årsak, 2017 - 2021',
          series: data,
          diagramTypeNavId: 'default',
        };
        this.dataIsLoading = false;
        this.dataIsLoaded = true;
      },
      error: (e) => console.error(e),
    });
  }

  private getDodsfallEtterAarsak_2017() {
    this.highchartsDataService.getData(MockData.DodsfallEtterAarsak_2017).subscribe({
      next: (data: FhiDiagramSerie[]) => {
        this.diagramOptions = {
          diagramTypeId: 'line',
          title: 'Dødsfall etter årsak, 2017',
          series: data,
          diagramTypeNavId: 'default',
        };
        this.dataIsLoading = false;
        this.dataIsLoaded = true;
      },
      error: (e) => console.error(e),
    });
  }

  private getDodsfallHjerteOgKarEtterFylke() {
    this.highchartsDataService.getData(MockData.DodsfallHjerteOgKarEtterFylke).subscribe({
      next: (data: FhiDiagramSerie[]) => {
        this.diagramOptions = {
          title: 'Dødsfall hjerte og kar, fordelt på fylke',
          series: data,
          diagramTypeId: 'map',
          diagramTypeSubset: ['table', 'map', 'column', 'bar', 'pie'],
          diagramTypeNavId: 'default',
          flags: [
            { symbol: '..', label: 'Manglende data' },
            { symbol: '.', label: 'Lar seg ikke beregne' },
            { symbol: ':', label: 'Anonymisert' },
          ],
          creditsHref: 'https://www.fhi.no/hn/folkehelse/artikler/oppdateringer',
          creditsText: 'Nøkkeltall for folkehelse',
          disclaimer: 'Disse dataene kan inneholde feil.',
          lastUpdated: '06.06.2023',
          mapTypeId: 'mapFylker',
          openSource: false,
          showFullScreenButton: true,
          metadataButton: true,
        };
        this.dataIsLoading = false;
        this.dataIsLoaded = true;
      },
      error: (e) => console.error(e),
    });
  }

  private getTestData() {
    this.highchartsDataService.getData(MockData.TestData).subscribe({
      next: (data: FhiDiagramSerie[]) => {
        this.diagramOptions = {
          // title: 'Befolkning (antall og andel) - inndeling per 1.1.2024',
          title: 'Dual axes, line and column',
          series: data,
          // diagramTypeId: 'column',
          diagramTypeNavId: 'default',
          diagramTypeSubset: ['table', 'column'],
          flags: [
            { symbol: '..', label: 'Manglende data' },
            { symbol: '.', label: 'Lar seg ikke beregne' },
            { symbol: ':', label: 'Anonymisert' },
          ],
          // creditsHref: 'https://www.fhi.no/hn/folkehelse/artikler/oppdateringer',
          // creditsText: 'Nøkkeltall for folkehelse',
          // disclaimer: 'Disse dataene kan inneholde feil.',
          // lastUpdated: '06.06.2023',
          // mapTypeId: 'mapFylker',
          openSource: false,
          // showFullScreenButton: true,
          // tableOrientation: 'seriesAsColumns',
        };
        this.dataIsLoading = false;
        this.dataIsLoaded = true;
      },
      error: (e) => console.error(e),
    });
  }
}
