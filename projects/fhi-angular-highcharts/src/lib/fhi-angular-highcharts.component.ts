import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { first } from 'rxjs/operators';
import * as Highcharts from 'highcharts'; // https://github.com/highcharts/highcharts/issues/14183, hvis Highcharts endrer fra CommonJS til ECMAScript modules i fremtidig versjon, fjern følgende fra angular.json: "allowedCommonJsDependencies": ["highcharts"]
import { Options, Chart } from 'highcharts'; // https://github.com/highcharts/highcharts/issues/14183, hvis Highcharts endrer fra CommonJS til ECMAScript modules i fremtidig versjon, fjern følgende fra angular.json: "allowedCommonJsDependencies": ["highcharts"]
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsOfflineExporting from 'highcharts/modules/offline-exporting';
import HighchartsExportData from 'highcharts/modules/export-data';
import HighchartsMap from 'highcharts/modules/map';

import { FhiDiagramOptions } from './fhi-diagram/fhi-diagram-options.model';
import { OptionsService } from './services/options.service';
import { TableService } from './services/table.service';
import { ChartInstanceService } from './services/chart-instance.service';
import { CsvService } from './services/csv.service';
import { DownloadService } from './services/download.service';
import { GeoJsonService } from "./services/geo-json.service";

import { FhiDiagramType } from './fhi-diagram/fhi-diagram-type.model';
import { FhiDiagramTypes } from './fhi-diagram/fhi-diagram-types';

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
  tableLastUpdated!: string;
  tableDisclaimer!: string;
  tableCreditsHref!: string;
  tableCreditsText!: string;

  @Input() diagramOptions!: FhiDiagramOptions;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private optionsService: OptionsService,
    private chartInstanceService: ChartInstanceService,
    private csvService: CsvService,
    private tableService: TableService,
    private downloadService: DownloadService,
    private geoJsonService: GeoJsonService
  ) {
    HighchartsExporting(Highcharts);
    HighchartsOfflineExporting(Highcharts);
    HighchartsExportData(Highcharts);
    HighchartsMap(Highcharts);
  }

  ngOnChanges() {
    this.diagramOptions = this.setOptionalFhiDiagramOptions(this.diagramOptions);
    this.currentDiagramTemplate = this.getCurrentDiagramTemplate(this.diagramOptions.diagramType);
    this.options = this.optionsService.updateOptions(this.diagramOptions, this.allMapsLoaded);

    if (this.currentDiagramTemplate === this.diagramTemplates.table) {
      this.updateTable(this.options);
    }
    if (this.diagramOptions.diagramType.isMap) {
      this.checkIfMapIsLoaded(this.diagramOptions.diagramType);
    }
  }

  onChartInstance(chart: Chart) {
    this.chartInstanceService.chart = chart;
    this.downloadService.setConfig(this.diagramOptions);
    this.csvService.csv = chart.getCSV();
  }

  private setOptionalFhiDiagramOptions(diagramOptions: FhiDiagramOptions): FhiDiagramOptions {
    return {
      ...diagramOptions,
      diagramType: (diagramOptions.diagramType) ? diagramOptions.diagramType : FhiDiagramTypes.table,
      openSource: true
    }
    // TODO: need system in OptionsService for when to render/not render anything that has to do with properties below:
    // creditsHref?: string;
    // creditsText?: string;
    // disclaimer?: string;
    // lastUpdated?: string;
  }

  private updateTable(options: Highcharts.Options) {
    this.tableHeaderRow = this.tableService.getHeaderRow(options);
    this.tableBodyRows = this.tableService.getDataRows(options);
    this.tableTitle = this.diagramOptions.title;
    this.tableLastUpdated = this.diagramOptions.lastUpdated;
    this.tableDisclaimer = this.diagramOptions.disclaimer;
    this.tableCreditsHref = this.diagramOptions.creditsHref;
    this.tableCreditsText = this.diagramOptions.creditsText;

    // TODO: solution for generating table data without using csv from Highcharts
    this.csvService.csv = this.tableService.getCsv(options);

    this.changeDetector.detectChanges();
  }

  private updateMap(map: any) {
    this.geoJsonService.updateMapFeatures(map);
    this.allMapsLoaded = true;
    this.options = this.optionsService.updateOptions(this.diagramOptions, this.allMapsLoaded);
    this.changeDetector.detectChanges();
  }

  private checkIfMapIsLoaded(diagramtype: FhiDiagramType) {
    if (Highcharts.maps[diagramtype.id]) {
      this.updateMap(Highcharts.maps[diagramtype.id]);
    } else {
      this.loadMap(diagramtype);
    }
  }

  private loadMap(diagramtype: FhiDiagramType) {
    this.geoJsonService.getMap(diagramtype.mapFile)
      .pipe(first()).subscribe(map => {
        this.geoJsonService.addMapToHighcharts(Highcharts, map, diagramtype.id);
        this.updateMap(map);
      });
  }

  private getCurrentDiagramTemplate(diagramtype: FhiDiagramType): string {
    if (diagramtype.id === FhiDiagramTypes.table.id) {
      return DiagramTemplates.table;
    }
    if (diagramtype.isMap) {
      return DiagramTemplates.map;
    }
    this.showDefaultChartTemplate = !this.showDefaultChartTemplate;
    return DiagramTemplates.chart
  }

}
