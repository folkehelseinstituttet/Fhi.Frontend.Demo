import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, ViewEncapsulation } 
  from '@angular/core';
import { first } from 'rxjs/operators';
// https://github.com/highcharts/highcharts/issues/14183, 
// hvis Highcharts endrer fra CommonJS til ECMAScript modules i fremtidig versjon, 
// fjern følgende fra angular.json: "allowedCommonJsDependencies": ["highcharts"]
import Highcharts, { Options, Chart } from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsOfflineExporting from 'highcharts/modules/offline-exporting';
import HighchartsExportData from 'highcharts/modules/export-data';
import HighchartsMap from 'highcharts/modules/map';

import { FhiHighchartsConfig } from './fhi-highcharts-config.model';
import { FhiHighchartsOptionsService } from './services/fhi-highcharts-options.service';
import { FhiHighchartsTableService } from './services/fhi-highcharts-table.service';
import { FhiHighchartsChartInstanceService } from './services/fhi-highcharts-chart-instance.service';
import { FhiHighchartsCsvService } from './services/fhi-highcharts-csv.service';
import { FhiHighchartsDownloadService } from './services/fhi-highcharts-download.service';
import { FhiHighchartsGeoJsonService } from "./services/fhi-highcharts-geo-json.service";
import { Diagramtype, Diagramtyper } from './fhi-highcharts-diagramtyper';
import { Subscription } from 'rxjs';
enum DiagramTemplates { chart = 'chart', map = 'map', table = 'table' };

@Component({
  selector: 'fhi-highcharts',
  templateUrl: './fhi-highcharts.component.html',
  styleUrls: ['./fhi-highcharts.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FhiHighchartsComponent implements OnInit, OnDestroy, OnChanges {

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

  private subscription = new Subscription();

  highcharts = Highcharts;
  options: Options;
  diagramTemplates = DiagramTemplates;
  currentDiagramTemplate: string;
  showDefaultChartTemplate = true;
  allMapsLoaded = false;
  tableTitle: string;
  tableHeaderRow = new Array();
  tableBodyRows = new Array();

  @Input() config: FhiHighchartsConfig;
  @Input() includeSumRow: boolean = true;

  ngOnInit() {
    this.subscription.add(this.csvService.parsedCsv$.subscribe(parsedCsv => {
      if (this.config.diagramtype.id === Diagramtyper.table.id) {
        this.updateTable(parsedCsv.data, this.includeSumRow)
      }
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnChanges() {
    this.currentDiagramTemplate = this.getCurrentDiagramTemplate(this.config.diagramtype);
    this.options = this.optionsService.updateOptions(this.config, this.allMapsLoaded);
    if (this.config.diagramtype.isMap) {
      this.checkIfMapIsLoaded(this.config.diagramtype);
    }
  }

  onChartInstance(chart: Chart) {
    this.chartInstanceService.chart = chart;
    this.downloadService.setConfig(this.config);   
    this.csvService.csv = chart.getCSV();
    this.csvService.parseHighchartsCsv(); // Triggers parsed
  }

  private updateTable(data: string[][], includeSumRow: boolean = true) {
    const table = this.tableService.getTable(data);
    this.tableHeaderRow = table[0];
    this.tableBodyRows = table.slice(1);
    if (!includeSumRow) {
      this.tableBodyRows.splice(-1, 1);
    }
    this.tableTitle = this.config.title;
    this.changeDetector.detectChanges();
  }

  private updateMap(map: any) {
    this.geoJsonService.updateMapFeatures(map);
    this.allMapsLoaded = true;
    this.options = this.optionsService.updateOptions(this.config, this.allMapsLoaded);
    this.changeDetector.detectChanges();
  }

  private checkIfMapIsLoaded(diagramtype: Diagramtype) {
    if (Highcharts.maps[diagramtype.id]) {
      this.updateMap(Highcharts.maps[diagramtype.id]);
    } else {
      this.loadMap(diagramtype);
    }
  }

  private loadMap(diagramtype: Diagramtype) {
    this.geoJsonService.getMap(diagramtype.mapFile)
      .pipe(first()).subscribe(map => {
        this.geoJsonService.addMapToHighcharts(Highcharts, map, diagramtype.id);
        this.updateMap(map);
      }, error => console.error(error));
  }

  private getCurrentDiagramTemplate(diagramtype: Diagramtype): string {
    if (diagramtype.id === Diagramtyper.table.id) {
      return DiagramTemplates.table;
    }
    if (diagramtype.isMap) {
      return DiagramTemplates.map;
    }
    this.showDefaultChartTemplate = !this.showDefaultChartTemplate;
    return DiagramTemplates.chart
  }

}
