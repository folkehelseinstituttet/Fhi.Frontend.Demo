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
  showUnitSelect = false;

  titles = {
    title_1: 'Dødsfall etter årsak, 2008 - 2018',
    title_2a: 'Dødsfall etter årsak, 2017 - 2021',
    title_2b: 'Dødsfall etter årsak, 2017',
    title_2c: 'Dødsfall etter årsak, 2017 - 2021, Hjerteinfarkt | Mann',
    title_3a: 'Befolkning - inndeling per 1.1.2024 (antall)',
    title_3b: 'Befolkning - inndeling per 1.1.2024 (andel)',
    title_3c: 'Dødsfall hjerte og kar, fordelt på fylke',
    title_3d: 'Dobbel akse, linje og søyle',
  };

  constructor(
    private highchartsDataService: MockDataService,
    private viewportScroller: ViewportScroller,
  ) {}

  ngOnInit() {
    if (this.itemId === this.items.HighchartsWithoutMenu.id) {
      this.getExampleData('1');
    } else if (this.itemId === this.items.HighchartsWithMenu.id) {
      this.getExampleData('2a');
    } else if (this.itemId === this.items.HighchartsAllInclusive.id) {
      this.getExampleData('3a');
    }
  }

  onDiagramTypeNavigation(id: FhiDiagramTypeIds) {
    this.diagramOptions = {
      ...this.diagramOptions,
      activeDiagramType: id,
    };
  }

  onSelectMockData(value: string) {
    this.getExampleData(value);
  }

  onMetadataButtonClick() {
    this.viewportScroller.scrollToAnchor('om-dataene');
  }

  private getData(mockDataId: number, diagramOptions: FhiDiagramOptions) {
    this.dataIsLoading = true;
    this.dataIsLoaded = false;

    this.highchartsDataService.getData(mockDataId).subscribe({
      next: (data: FhiDiagramSerie[]) => {
        this.diagramOptions = {
          ...diagramOptions,
          series: data,
        };

        // Mocking a delayed server response
        setTimeout(() => {
          this.dataIsLoading = false;
          this.dataIsLoaded = true;
        }, 750);
      },

      error: (e) => console.error(e),
    });
  }

  private getExampleData(example: string) {
    switch (example) {
      case '1':
        this.getData__example_1();
        break;
      case '2a':
        this.getData__example_2a();
        break;
      case '2b':
        this.getData__example_2b();
        break;
      case '2c':
        this.getData__example_2c();
        break;
      case '3a':
        this.getData__example_3a();
        break;
      case '3b':
        this.getData__example_3b();
        break;
      case '3c':
        this.getData__example_3c();
        break;
      case '3d':
        this.getData__example_3d();
        break;
      // this.getTestData(); // Data for testing/debugging while developing locally, do not show in dev or prod.
    }
  }

  private getData__example_1() {
    this.getData(MockData.DodsfallEtterAarsak_2008_2018, {
      series: undefined,
      activeDiagramType: 'line',
      title: this.titles.title_1,
    });
  }

  private getData__example_2a() {
    const activeDiagramType = this.diagramOptions?.activeDiagramType;
    this.getData(MockData.DodsfallEtterAarsak_2017_2021, {
      series: undefined,
      activeDiagramType: activeDiagramType ? activeDiagramType : undefined,
      title: this.titles.title_2a,
      controls: {
        navigation: {
          show: true,
        },
      },
    });
  }

  private getData__example_2b() {
    this.getData(MockData.DodsfallEtterAarsak_2017, {
      ...this.diagramOptions,
      title: this.titles.title_2b,
    });
  }

  private getData__example_2c() {
    this.getData(MockData.DodsfallEtterAarsak_2017_2021_Hjerteinfarkt_Mann, {
      ...this.diagramOptions,
      title: this.titles.title_2c,
    });
  }

  private getData__example_3a() {
    this.getData(MockData.BefolkningInndelingPr2024_antall, {
      series: undefined,
      activeDiagramType: 'column',
      title: this.titles.title_3a,
      controls: {
        fullScreenButton: {
          show: true,
        },
        metadataButton: {
          show: true,
        },
        navigation: {
          items: {
            chartTypes: ['bar', 'column', 'columnAndLine', 'line', 'pie'],
            mapTypes: ['mapFylker2023'],
          },
          show: true,
        },
      },
      footer: {
        credits: {
          href: 'https://www.fhi.no',
          text: 'Folkehelseinstituttet',
        },
        disclaimer: 'Disse dataene kan inneholde feil.',
        flags: [
          { symbol: '..', label: 'Manglende data' },
          { symbol: '.', label: 'Lar seg ikke beregne' },
          { symbol: ':', label: 'Anonymisert' },
        ],
        lastUpdated: '18.04.2024',
      },
      openSource: false,
      tableOrientation: 'seriesAsColumns',
      units: [{ label: 'Antall' }],
    });
  }

  private getData__example_3b() {
    this.getData(MockData.BefolkningInndelingPr2024_andel, {
      ...this.diagramOptions,
      activeDiagramType: 'line',
      title: this.titles.title_3b,
      units: [
        {
          decimals: 1,
          label: 'Prosent',
          symbol: '%',
          position: 'end',
          yAxisMax: 20,
          yAxisMin: 10,
        },
      ],
    });
  }

  private getData__example_3c() {
    this.getData(MockData.DodsfallHjerteOgKarEtterFylke, {
      ...this.diagramOptions,
      activeDiagramType: 'mapFylker2023',
      title: this.titles.title_3c,
      units: undefined,
    });
  }

  private getData__example_3d() {
    this.getData(MockData.AgensAntallOgAndel, {
      ...this.diagramOptions,
      activeDiagramType: 'columnAndLine',
      title: this.titles.title_3d,
      units: [
        {
          id: 'antall',
          label: 'Antall',
          yAxis: 0,
        },
        {
          id: 'prosent',
          decimals: 1,
          label: 'Prosent',
          symbol: '%',
          position: 'end',
          yAxis: 1,
        },
      ],
    });
  }

  private getTestData() {
    this.getData(MockData.TestData, {
      series: undefined,
      activeDiagramType: 'columnAndLine',
      controls: {
        navigation: {
          show: true,
        },
      },
      footer: {
        flags: [
          {
            symbol: ':',
            label: 'Anonymisert',
          },
        ],
      },
      openSource: false,
      tableOrientation: 'seriesAsColumns',
      title: 'Dobbel akse, linje og søyle',
      units: [
        {
          id: 'antall',
          label: 'Antall',
        },
        {
          id: 'prosent',
          decimals: 1,
          label: 'Prosent',
          symbol: '%',
          position: 'end',
        },
      ],

      // The following will be deprecated in v5
      // --------------------------------------
      // diagramTypeId: 'map',
      // diagramTypeNavId: 'default',
      // decimals: 2,
      // flags: [
      //   { symbol: '..', label: 'Manglende data' },
      //   { symbol: '.', label: 'Lar seg ikke beregne' },
      //   { symbol: ':', label: 'Anonymisert' },
      // ],
      // creditsHref: 'https://www.fhi.no/hn/folkehelse/artikler/oppdateringer',
      // creditsText: 'Nøkkeltall for folkehelse',
      // disclaimer: 'Disse dataene kan inneholde feil.',
      // lastUpdated: '06.06.2023',
      // mapTypeId: 'mapFylker',
      // showFullScreenButton: true,
    });
  }
}
