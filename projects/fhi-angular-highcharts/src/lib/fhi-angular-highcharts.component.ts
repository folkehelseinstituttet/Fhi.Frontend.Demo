import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Options } from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsOfflineExporting from 'highcharts/modules/offline-exporting';
import HighchartsExportData from 'highcharts/modules/export-data';
import HighchartsMap from 'highcharts/modules/map';
import HighchartsAccessibility from 'highcharts/modules/accessibility';

import { FhiDiagramOptions, FhiDiagramSerie } from './fhi-diagram/fhi-diagram.models';
import { OptionsService } from './services/options.service';
import { TableService } from './services/table.service';
import { DiagramTypeService } from './services/diagram-type.service';

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
    private diagramTypeService: DiagramTypeService,
    private tableService: TableService,
  ) {
    HighchartsExporting(Highcharts);
    HighchartsOfflineExporting(Highcharts);
    HighchartsExportData(Highcharts);
    HighchartsMap(Highcharts);
    HighchartsAccessibility(Highcharts);
  }

  ngOnChanges() {
    try {
      if (!this.diagramOptions.data) {
        throw new Error('TODO: user need a good feedback when there is no data to show!');
      }
      this.diagramTypeService.series = this.diagramOptions.data;
      this.diagramOptions = this.setOptionalFhiDiagramOptions(this.diagramOptions);
      this.currentDiagramTypeGroup = this.getCurrentDiagramTypeGroup(this.diagramOptions.diagramType);

      if (this.currentDiagramTypeGroup === FhiDiagramTypeGroups.table) {
        this.updateTable(this.diagramTypeService.series);
      } else {
        // TODO: this.options -> this.highchartsOptions
        this.options = this.optionsService.updateOptions(this.diagramOptions, this.allMapsLoaded);
      }
    } catch (error) {
      console.error(error);
      console.error(this.getErrorMsg());
    }
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
  }

  private updateTable(series: FhiDiagramSerie[]) {
    this.tableHeaderRow = this.tableService.getHeaderRow(series);
    this.tableBodyRows = this.tableService.getDataRows(series);
    this.tableTitle = this.diagramOptions.title;
    this.tableLastUpdated = this.diagramOptions.lastUpdated;
    this.tableDisclaimer = this.diagramOptions.disclaimer;
    this.tableCreditsHref = this.diagramOptions.creditsHref;
    this.tableCreditsText = this.diagramOptions.creditsText;

    // TODO: solution for generating table data without using csv from Highcharts
    // this.csvService.csv = this.tableService.getCsv(options);

    // TODO: add data-menu for testing data-update, and see if changeDetector is still needed
    this.changeDetector.detectChanges();
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
