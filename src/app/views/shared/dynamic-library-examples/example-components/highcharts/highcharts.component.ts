import { Component, Input, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';

import { MockDataService } from './mock-data.service';
import { MockData } from './mock-data.enum';

import {
  FhiDiagramOptions,
  FhiDiagramSerie,
  FhiTableOrientations,
  FhiDiagramTypeIds,
} from '@folkehelseinstituttet/angular-highcharts';

import { LibraryItemsShared } from '../../../models/library-item.model';

@Component({
  selector: 'app-highcharts',
  templateUrl: './highcharts.component.html',
  standalone: false,
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
    title_3e: 'Prikkede data med to serier',
    title_3f: 'Valgdeltagelse 2015, fordelt på fylke',
    title_11: 'Test-data - Tomt datasett',
    title_12: 'TEST: Feilmeldinger for alle diagramtyper',
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
      // this.getTestData(); // Data for testing/debugging while developing locally, do not show in dev or prod.
    }
  }

  onDiagramTypeNavigation(id: FhiDiagramTypeIds) {
    this.diagramOptions = {
      ...this.diagramOptions,
      activeDiagramType: id,
    };
  }

  onTableOrientationChange(orientation: FhiTableOrientations) {
    this.diagramOptions = {
      ...this.diagramOptions,
      tableOrientation: orientation,
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
      case '3e':
        this.getData__example_3e();
        break;
      case '3f':
        this.getData__example_3f();
        break;
      case '11':
        this.getData__example_11();
        break;
      case '12':
        this.getData__example_12();
        break;
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
          items: {
            chartTypes: [
              'line',
              'bar',
              'barStacked',
              'column',
              'columnStacked',
              'pie',
              'columnAndLine',
            ],
            mapTypes: ['mapFylker', 'mapFylker2019', 'mapFylker2023'],
          },
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
      categoryAxis: {
        title: 'Uke',
      },
      controls: {
        downloadButton: {
          show: true,
        },
        fullScreenButton: {
          show: true,
        },
        metadataButton: {
          show: true,
        },
        tableOrientationButton: {
          show: true,
        },
        navigation: {
          items: {
            chartTypes: ['bar', 'column', 'line', 'pie'],
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
    this.diagramOptions.controls.navigation.items.chartTypes = ['bar', 'column', 'line', 'pie'];
    this.getData(MockData.BefolkningInndelingPr2024_andel, {
      ...this.diagramOptions,
      activeDiagramType: 'line',
      controls: {
        ...this.diagramOptions.controls,
        tableOrientationButton: {
          show: true,
        },
      },
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
      activeDiagramType: 'mapFylker',
      title: this.titles.title_3c,
      units: undefined,
      controls: {
        ...this.diagramOptions.controls,
        navigation: {
          ...this.diagramOptions.controls.navigation,
          items: {
            chartTypes: ['bar', 'column', 'line', 'pie'],
            mapTypes: ['mapFylker'],
          },
        },
      },
    });
  }

  private getData__example_3d() {
    this.getData(MockData.AgensAntallOgAndel, {
      ...this.diagramOptions,
      activeDiagramType: 'columnAndLine',
      controls: {
        ...this.diagramOptions.controls,
        navigation: {
          ...this.diagramOptions.controls.navigation,
          items: {
            ...this.diagramOptions.controls.navigation.items,
            chartTypes: ['bar', 'column', 'columnAndLine', 'line', 'pie'],
          },
        },
      },
      title: this.titles.title_3d,
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
    });
  }

  private getData__example_3e() {
    this.getData(MockData.PrikkedeDataMedToSerier, {
      ...this.diagramOptions,
      activeDiagramType: 'line',
      description: 'Her kan en legge til en beskrivelse av dataene.',
      title: this.titles.title_3e,
      units: undefined,
      footer: {
        credits: {
          href: 'https://www.fhi.no',
          text: 'Folkehelseinstituttet',
        },
        disclaimer: 'Disse dataene kan inneholde feil.',
        flags: [{ symbol: '.', label: 'Lar seg ikke beregne' }],
        lastUpdated: '18.04.2024',
      },
    });
  }

  private getData__example_3f() {
    this.getData(MockData.Valgdeltagelse2015, {
      ...this.diagramOptions,
      activeDiagramType: 'mapFylker',
      title: this.titles.title_3f,
      units: undefined,
      categoryAxis: {
        title: 'År',
      },
      controls: {
        ...this.diagramOptions.controls,
        navigation: {
          ...this.diagramOptions.controls.navigation,
          items: {
            chartTypes: ['bar', 'column', 'line', 'pie'],
            mapTypes: ['mapFylker'],
          },
        },
      },
      footer: {
        credits: {
          href: 'https://www.fhi.no',
          text: 'Folkehelseinstituttet',
        },
        disclaimer: 'Disse dataene kan inneholde feil.',
        flags: [{ symbol: '.', label: 'Lar seg ikke beregne' }],
        lastUpdated: '18.04.2024',
      },
    });
  }

  private getData__example_11() {
    this.getData(MockData.TestData11, {
      ...this.diagramOptions,
      activeDiagramType: 'line',
      title: this.titles.title_11,
      units: undefined,
      categoryAxis: {
        title: 'År',
      },
      controls: {
        ...this.diagramOptions.controls,
        navigation: {
          ...this.diagramOptions.controls.navigation,
          items: {
            chartTypes: [
              'line',
              'bar',
              'barStacked',
              'column',
              'columnStacked',
              'pie',
              'columnAndLine',
            ],
            mapTypes: ['mapFylker', 'mapFylker2019', 'mapFylker2023'],
          },
        },
      },
      footer: {
        credits: {
          href: 'https://www.fhi.no',
          text: 'Folkehelseinstituttet',
        },
        disclaimer: 'Disse dataene kan inneholde feil.',
        flags: [{ symbol: '.', label: 'Lar seg ikke beregne' }],
        lastUpdated: '18.04.2024',
      },
      disabledWarning: {
        showRequirements: true,
        title: 'Her vil du se diagrammet ditt når følgende er utført...',
      },
    });
  }

  private getData__example_12() {
    // Test data with multiple series, flagged data, and 3 units to trigger validation errors on ALL diagram types
    this.getData(MockData.TestData12, {
      series: undefined,
      activeDiagramType: 'pie',
      title: this.titles.title_12,
      description:
        'Denne siden viser feilmeldinger for alle diagramtyper. Bytt mellom diagram for å se de spesifikke kravene.',
      controls: {
        downloadButton: {
          show: true,
        },
        fullScreenButton: {
          show: true,
        },
        navigation: {
          items: {
            chartTypes: [
              'bar',
              'barStacked',
              'column',
              'columnStacked',
              'columnAndLine',
              'line',
              'pie',
            ],
            mapTypes: ['mapFylker', 'mapFylker2019', 'mapFylker2023'],
          },
          show: true,
        },
      },
      units: [
        {
          id: 'enhet1',
          label: 'Enhet 1',
        },
        {
          id: 'enhet2',
          decimals: 1,
          label: 'Enhet 2',
        },
        {
          id: 'enhet3',
          decimals: 0,
          label: 'Enhet 3',
        },
      ],
      footer: {
        flags: [
          { symbol: '.', label: 'Lar seg ikke beregne' },
          { symbol: ':', label: 'Anonymisert' },
        ],
      },
      disabledWarning: {
        showRequirements: true,
        title: 'Diagrammet kan ikke vises',
      },
    });
  }

  private getTestData() {
    this.getData(MockData.TestData, {
      series: undefined,
      controls: {
        downloadButton: {
          show: true,
        },
        navigation: {
          items: {
            chartTypes: [
              'bar',
              'barStacked',
              'column',
              'columnAndLine',
              'columnStacked',
              'line',
              'pie',
            ],
            mapTypes: ['mapFylker2023'],
            // mapTypes: ['mapFylker', 'mapFylker2019', 'mapFylker2023'],
          },
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
      title: 'Testdata',
      units: [
        {
          id: 'Antall1',
          decimals: null,
          label: 'Antall',
        },
        {
          id: 'Andel2',
          decimals: 1,
          label: 'Prosent',
          symbol: '%',
          position: 'end',
        },
      ],
    });
  }
}
