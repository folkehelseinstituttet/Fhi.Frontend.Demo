import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { first } from 'rxjs/operators';
import * as Highcharts from 'highcharts'; // https://github.com/highcharts/highcharts/issues/14183, hvis Highcharts endrer fra CommonJS til ECMAScript modules i fremtidig versjon, fjern følgende fra angular.json: "allowedCommonJsDependencies": ["highcharts"]
import { Options, Chart } from 'highcharts'; // https://github.com/highcharts/highcharts/issues/14183, hvis Highcharts endrer fra CommonJS til ECMAScript modules i fremtidig versjon, fjern følgende fra angular.json: "allowedCommonJsDependencies": ["highcharts"]
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsOfflineExporting from 'highcharts/modules/offline-exporting';
import HighchartsExportData from 'highcharts/modules/export-data';
import HighchartsMap from 'highcharts/modules/map';

// TODO: rename (either FhiAngularHighcharts or just Highcharts, or maybe no prefix at all...)
import { DiagramOptions, FhiHighchartsConfig } from './fhi-highcharts-config.model';
import { FhiHighchartsOptionsService } from './services/fhi-highcharts-options.service';
import { FhiHighchartsTableService } from './services/fhi-highcharts-table.service';
import { FhiHighchartsChartInstanceService } from './services/fhi-highcharts-chart-instance.service';
import { FhiHighchartsCsvService } from './services/fhi-highcharts-csv.service';
import { FhiHighchartsDownloadService } from './services/fhi-highcharts-download.service';
import { FhiHighchartsGeoJsonService } from "./services/fhi-highcharts-geo-json.service";

import { DiagramType } from './fhi-diagram-types/fhi-diagram-type.model';
import { DiagramTypes } from './fhi-diagram-types/fhi-diagram-types';

enum DiagramTemplates { chart = 'chart', map = 'map', table = 'table' };


@Component({
  selector: 'fhi-angular-highcharts',
  templateUrl: './fhi-angular-highcharts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FhiAngularHighchartsComponent {

  Highcharts: typeof Highcharts = Highcharts;
  options!: Options;
  diagramTemplates = DiagramTemplates;
  currentDiagramTemplate!: string;
  showDefaultChartTemplate = true;
  allMapsLoaded = false;
  tableTitle!: string;
  tableHeaderRow = new Array();
  tableBodyRows = new Array();


  config!: FhiHighchartsConfig;

  @Input() diagramOptions!: DiagramOptions;


  constructor(
    private changeDetector: ChangeDetectorRef,
    private optionsService: FhiHighchartsOptionsService,
    private chartInstanceService: FhiHighchartsChartInstanceService,
    private csvService: FhiHighchartsCsvService,
    private tableService: FhiHighchartsTableService,
    private downloadService: FhiHighchartsDownloadService,
    private geoJsonService: FhiHighchartsGeoJsonService
  ) {
    HighchartsExporting(Highcharts);
    HighchartsOfflineExporting(Highcharts);
    HighchartsExportData(Highcharts);
    HighchartsMap(Highcharts);
  }

  ngOnChanges() {


    // TODO: just one config named diagramOptions when all refactoring is done!
    this.config = this.diagramConfigToConfigAdapterTMP(this.diagramOptions);


    this.currentDiagramTemplate = this.getCurrentDiagramTemplate(this.config.diagramtype);
    this.options = this.optionsService.updateOptions(this.config, this.allMapsLoaded);

    if (this.currentDiagramTemplate === this.diagramTemplates.table) {
      this.updateTable(this.options);
    }
    if (this.config.diagramtype.isMap) {
      this.checkIfMapIsLoaded(this.config.diagramtype);
    }
  }

  onChartInstance(chart: Chart) {

    this.chartInstanceService.chart = chart;
    this.downloadService.setConfig(this.config);
    this.csvService.csv = chart.getCSV();
  }



  // TODO: just one config named diagramConfig when all refactoring is done!
  //       And then delete this method.
  private diagramConfigToConfigAdapterTMP(diagramConfig: DiagramOptions): FhiHighchartsConfig {
    return {
      captionDisclaimer: diagramConfig.disclaimer,
      captionLastUpdated: diagramConfig.lastUpdated,
      creditsHref: diagramConfig.creditsHref,
      creditsText: diagramConfig.creditsText,
      diagramtype: DiagramTypes.column,
      title: diagramConfig.title,
      series: this.seriesFromDiagramConfigData(diagramConfig.data)
    };
  }
  // In this POC the data from the data-service has correct type, in a real app
  // this is where data from API is transformed for Highcharts consumption.
  private seriesFromDiagramConfigData(data: any): any {
    return data;
  }




  private updateTable(options: Highcharts.Options) {
    this.tableHeaderRow = this.tableService.getHeaderRow(options);
    this.tableBodyRows = this.tableService.getDataRows(options);
    this.csvService.csv = this.tableService.getCsv(options);
    this.tableTitle = this.config.title;
    this.changeDetector.detectChanges();
  }

  private updateMap(map: any) {
    this.geoJsonService.updateMapFeatures(map);
    this.allMapsLoaded = true;
    this.options = this.optionsService.updateOptions(this.config, this.allMapsLoaded);
    this.changeDetector.detectChanges();
  }

  private checkIfMapIsLoaded(diagramtype: DiagramType) {
    if (Highcharts.maps[diagramtype.id]) {
      this.updateMap(Highcharts.maps[diagramtype.id]);
    } else {
      this.loadMap(diagramtype);
    }
  }

  private loadMap(diagramtype: DiagramType) {
    this.geoJsonService.getMap(diagramtype.mapFile)
      .pipe(first()).subscribe(map => {
        this.geoJsonService.addMapToHighcharts(Highcharts, map, diagramtype.id);
        this.updateMap(map);
      });
  }

  private getCurrentDiagramTemplate(diagramtype: DiagramType): string {
    if (diagramtype.id === DiagramTypes.table.id) {
      return DiagramTemplates.table;
    }
    if (diagramtype.isMap) {
      return DiagramTemplates.map;
    }
    this.showDefaultChartTemplate = !this.showDefaultChartTemplate;
    return DiagramTemplates.chart
  }

}
