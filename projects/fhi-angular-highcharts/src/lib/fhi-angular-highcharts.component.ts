import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { first } from 'rxjs/operators';
import * as Highcharts from 'highcharts';
import { Options, Chart } from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsOfflineExporting from 'highcharts/modules/offline-exporting';
import HighchartsExportData from 'highcharts/modules/export-data';
import HighchartsMap from 'highcharts/modules/map';

import { FhiDiagramOptions } from './fhi-diagram/fhi-diagram.models';
import { OptionsService } from './services/options.service';
import { TableService } from './services/table.service';
import { ChartInstanceService } from './services/chart-instance.service';
import { CsvService } from './services/csv.service';
import { DiagramTypeService } from './services/diagram-type.service';
import { DownloadService } from './services/download.service';
import { GeoJsonService } from "./services/geo-json.service";

import { FhiDiagramType } from './fhi-diagram/fhi-diagram.models';
import { FhiDiagramTypes, FhiDiagramTypeGroups } from './fhi-diagram/fhi-diagram-types';
import { FhiDiagramTypeNavs } from './fhi-diagram-type-navs/fhi-diagram-type-nav.constants';


@Component({
  selector: 'fhi-angular-highcharts',
  templateUrl: './fhi-angular-highcharts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FhiAngularHighchartsComponent {

  Highcharts: typeof Highcharts = Highcharts;
  options!: Options;

  allMapsLoaded = false;
  currentDiagramTypeGroup!: string;
  diagramTypeGroups = FhiDiagramTypeGroups;
  diagramTypeNavs = FhiDiagramTypeNavs;
  numOfDimensions!: number;
  numOfSeries!: number;
  showDefaultChartTemplate = true;
  tableTitle!: string;
  tableHeaderRow = new Array();
  tableBodyRows = new Array();
  tableLastUpdated!: string;
  tableDisclaimer!: string;
  tableCreditsHref!: string;
  tableCreditsText!: string;

  @Input() diagramOptions!: FhiDiagramOptions;
  @Output() diagramTypeNav = new EventEmitter<FhiDiagramType>();

  constructor(
    private changeDetector: ChangeDetectorRef,
    private optionsService: OptionsService,
    private chartInstanceService: ChartInstanceService,
    private csvService: CsvService,
    private diagramTypeService: DiagramTypeService,
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
    try {
      this.diagramOptions = this.setOptionalFhiDiagramOptions(this.diagramOptions);
      this.diagramTypeService.data = this.diagramOptions.data;
      this.currentDiagramTypeGroup = this.getCurrentDiagramTypeGroup(this.diagramOptions.diagramType);
      this.options = this.optionsService.updateOptions(this.diagramOptions, this.allMapsLoaded);

      if (this.currentDiagramTypeGroup === FhiDiagramTypeGroups.table) {
        this.updateTable(this.options);
      }
      if (this.diagramOptions.diagramType.isMap) {
        this.checkIfMapIsLoaded(this.diagramOptions.diagramType);
      }
    } catch (error) {
      console.error(this.getErrorMsg());
    }
  }

  onChartInstance(chart: Chart) {
    this.chartInstanceService.chart = chart;
    this.downloadService.setConfig(this.diagramOptions);
    this.csvService.csv = chart.getCSV();
  }

  onDiagramTypeNav(diagramType: FhiDiagramType) {
    this.diagramTypeNav.emit(diagramType);
  }

  private setOptionalFhiDiagramOptions(diagramOptions: FhiDiagramOptions): FhiDiagramOptions {
    const d = diagramOptions;
    return {
      ...d,
      diagramType: (d.diagramType) ? d.diagramType : FhiDiagramTypes.table,
      openSource: (d.openSource) ? d.openSource : true,
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

  private getCurrentDiagramTypeGroup(diagramtype: FhiDiagramType): string {
    if (diagramtype.id === FhiDiagramTypes.table.id) {
      return FhiDiagramTypeGroups.table;
    }
    if (diagramtype.isMap) {
      return FhiDiagramTypeGroups.map;
    }
    this.showDefaultChartTemplate = !this.showDefaultChartTemplate;
    return FhiDiagramTypeGroups.chart
  }

  private getErrorMsg() {
    return `ERROR: @Input() diagramOptions === undefined
    at FhiAngularHighchartsComponent.ngOnChanges
    FhiAngularHighchartsComponent can not be rendered.
    To avoid this error message: test for diagramOptions !== undefined
    before calling <fhi-angular-highcharts [diagramOptions]="yourOptions"></fhi-angular-highcharts>`;
  }

}
