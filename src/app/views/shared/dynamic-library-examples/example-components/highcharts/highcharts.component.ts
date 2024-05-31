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
  private diagramOptions_INIT = {
    series: undefined,
  };

  @Input() itemId!: string;
  @Input() items!: LibraryItemsShared;

  dataIsLoading = false;
  dataIsLoaded = false;
  diagramOptions!: FhiDiagramOptions;
  showUnitSelect = false;

  constructor(
    private highchartsDataService: MockDataService,
    private viewportScroller: ViewportScroller,
  ) {}

  ngOnInit() {
    if (this.itemId === this.items.HighchartsWithoutMenu.id) {
      this.selectMockData('aarsak_2008_2018');
    } else if (this.itemId === this.items.HighchartsWithMenu.id) {
      this.selectMockData('aarsak_2017_2021');
    } else if (this.itemId === this.items.HighchartsAllInclusive.id) {
      this.selectMockData('befolkning_antall');
    }
  }

  onDiagramTypeNavigation(diagramTypeId: FhiDiagramTypeIds) {
    this.diagramOptions = {
      ...this.diagramOptions,
      diagramTypeId: diagramTypeId,
    };
  }

  onSelectMockData(value: string) {
    this.selectMockData(value);
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

  private selectMockData(value: string) {
    switch (value) {
      // dataset (init)
      case 'aarsak_2008_2018':
        this.getDodsfallEtterAarsak_2008_2018();
        break;
      case 'aarsak_2017_2021':
        this.getDodsfallEtterAarsak_2017_2021();
        break;
      case 'befolkning_antall':
        this.getTestData(); // Data for testing/debugging while developing locally, do not show in dev or prod.
        //this.getBefolkningInndelingPr2024_antall();
        this.showUnitSelect = true;
        break;
      case 'kart':
        this.getDodsfallHjerteOgKarEtterFylke();
        this.showUnitSelect = false;
        break;

      // select option filter
      case 'filter:aarsak_2017_2021':
        this.getDodsfallEtterAarsak_2017_2021_FILTER();
        break;
      case 'filter:aarsak_2017':
        this.getDodsfallEtterAarsak_2017_FILTER();
        break;
      case 'filter:hjerteinfarkt_mann':
        this.getDodsfallEtterAarsak_2017_2021_Hjerteinfarkt_Mann_FILTER();
        break;

      // select option unit
      case 'unit:befolkning_antall':
        this.getBefolkningInndelingPr2024_antall_UNIT();
        break;
      case 'unit:befolkning_andel':
        this.getBefolkningInndelingPr2024_andel_UNIT();
        break;
    }
  }

  private getDodsfallEtterAarsak_2008_2018() {
    this.getData(MockData.DodsfallEtterAarsak_2008_2018, {
      ...this.diagramOptions_INIT,
      diagramTypeId: 'line',
      title: 'Dødsfall etter årsak, 2008 - 2018',
    });
  }

  private getDodsfallEtterAarsak_2017_2021() {
    this.getData(MockData.DodsfallEtterAarsak_2017_2021, {
      ...this.diagramOptions_INIT,
      title: 'Dødsfall etter årsak, 2017 - 2021',
      diagramTypeNavId: 'default',
      diagramTypeSubset: ['bar', 'column', 'line', 'map', 'pie'],
      decimals: 2,
      mapTypeId: 'mapFylker',
    });
  }

  private getDodsfallHjerteOgKarEtterFylke() {
    this.getData(MockData.DodsfallHjerteOgKarEtterFylke, {
      ...this.getDiagramOptions_Kart_and_BefolkningInndelingPr2024_antall(),
      title: 'Dødsfall hjerte og kar, fordelt på fylke',
    });
  }

  private getBefolkningInndelingPr2024_antall() {
    this.getData(MockData.BefolkningInndelingPr2024_antall, {
      ...this.getDiagramOptions_Kart_and_BefolkningInndelingPr2024_antall(),
      title: 'Befolkning - inndeling per 1.1.2024 (antall)',
      diagramTypeId: 'column',
      units: [{ label: 'Antall' }],
    });
  }

  private getDodsfallEtterAarsak_2017_2021_FILTER() {
    this.getData(MockData.DodsfallEtterAarsak_2017_2021, {
      ...this.diagramOptions,
      title: 'Dødsfall etter årsak, 2017 - 2021',
    });
  }

  private getDodsfallEtterAarsak_2017_FILTER() {
    this.getData(MockData.DodsfallEtterAarsak_2017, {
      ...this.diagramOptions,
      title: 'Dødsfall etter årsak, 2017',
    });
  }

  private getDodsfallEtterAarsak_2017_2021_Hjerteinfarkt_Mann_FILTER() {
    this.getData(MockData.DodsfallEtterAarsak_2017_2021_Hjerteinfarkt_Mann, {
      ...this.diagramOptions,
      title: 'Dødsfall etter årsak, 2017 - 2021, Hjerteinfarkt | Mann',
    });
  }

  private getBefolkningInndelingPr2024_antall_UNIT() {
    this.getData(MockData.BefolkningInndelingPr2024_antall, {
      ...this.diagramOptions,
      title: 'Befolkning - inndeling per 1.1.2024 (antall)',
      units: [{ label: 'Antall' }],
    });
  }

  private getBefolkningInndelingPr2024_andel_UNIT() {
    this.getData(MockData.BefolkningInndelingPr2024_andel, {
      ...this.diagramOptions,
      title: 'Befolkning - inndeling per 1.1.2024 (andel)',
      units: [
        {
          decimals: 1,
          label: 'Prosent',
          symbol: '%',
          position: 'end',
        },
      ],
    });
  }

  private getDiagramOptions_Kart_and_BefolkningInndelingPr2024_antall(): FhiDiagramOptions {
    return {
      ...this.diagramOptions_INIT,
      activeDiagramType: 'mapFylker',
      controls: {
        fullScreenButton: {
          show: true,
        },
        metadataButton: {
          show: true,
        },
        navigation: {
          items: {
            chartTypes: ['bar', 'column', 'pie'],
            mapTypes: ['mapFylker'],
          },
          show: true,
          type: 'default', // this has no effect (currently only one nav type)
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
      title: '',
      units: [{ label: 'Antall' }],
    };
  }

  private getTestData() {
    this.getData(MockData.TestData, {
      ...this.diagramOptions_INIT,

      // activeDiagramType: 'columnAndLine',
      activeDiagramType: 'table',
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
      // series -> is set in this.getData()
      // tableOrientation: 'seriesAsColumns',
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

      // diagramTypeId: 'map',
      // diagramTypeNavId: 'default',
      decimals: 2,
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
