import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Options } from 'highcharts';
import HighchartsMap from 'highcharts/modules/map';
import HighchartsAccessibility from 'highcharts/modules/accessibility';

import { DataAnonymizedSerie, FhiDiagramOptions, FhiDiagramSerie } from './fhi-diagram/fhi-diagram.models';
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
  highchartsOptions!: Options;

  anonymizedSeries: DataAnonymizedSerie[] = []; // TODO...

  allMapsLoaded = false;
  currentDiagramTypeGroup!: string;
  diagramTypeGroups = FhiDiagramTypeGroups;
  diagramTypeNavs = FhiDiagramTypeNavs;
  numOfDimensions!: number;
  numOfSeries!: number;
  showDefaultChartTemplate = true;
  tableHeaderRows = new Array();
  tableBodyRows = new Array();
  showFooter = false;

  @Input() diagramOptions!: FhiDiagramOptions;
  @Output() diagramTypeNav = new EventEmitter<FhiDiagramType>();

  constructor(
    private optionsService: OptionsService,
    private diagramTypeService: DiagramTypeService,
    private tableService: TableService,
  ) {
    HighchartsMap(Highcharts);
    HighchartsAccessibility(Highcharts);
  }

  ngOnChanges() {
    try {
      this.diagramOptions = this.updateDiagramOptions(this.diagramOptions);
      this.showFooter = this.canShowFooter();
      this.currentDiagramTypeGroup = this.getCurrentDiagramTypeGroup(this.diagramOptions.diagramType);
      this.updateSeriesInDiagramTypeService();

      if (this.currentDiagramTypeGroup === FhiDiagramTypeGroups.table) {
        this.updateTable(this.diagramOptions.data);
      } else {
        this.highchartsOptions = this.optionsService.updateOptions(this.diagramOptions, this.allMapsLoaded);
        // this.setAnonymized(); // This is only for charts/maps
      }
    } catch (error) {
      console.error(error);
      console.error(this.getErrorMsg());
    }
  }

  onDiagramTypeNav(diagramType: FhiDiagramType) {
    this.diagramTypeNav.emit(diagramType);
  }

  tableCellDataOK(data: number | string): boolean {
    if (typeof data === "number") {
      return true;
    }
    return false;
  }

  private updateDiagramOptions(diagramOptions: FhiDiagramOptions): FhiDiagramOptions {
    return {
      ...diagramOptions,
      diagramType: (diagramOptions.diagramType) ? diagramOptions.diagramType : FhiDiagramTypes.table,
      openSource: (diagramOptions.openSource === undefined || diagramOptions.openSource) ? true : false
    }
  }

  private canShowFooter(): boolean {
    if (this.diagramOptions.openSource) {
      return false;
    }
    if (this.diagramOptions.lastUpdated !== undefined) {
      return true;
    }
    if (this.diagramOptions.disclaimer !== undefined) {
      return true;
    }
    if (this.diagramOptions.creditsHref !== undefined && this.diagramOptions.creditsText !== undefined) {
      return true;
    }
    return false;
  }

  private updateSeriesInDiagramTypeService() {
    this.diagramTypeService.series = this.diagramOptions.data;
  }




  private setAnonymized() {
    this.diagramOptions.data.forEach((serie, index) => {
      if (serie.dataAnonymized[0] !== undefined) {
        this.anonymizedSeries[index] = {
          name: serie.name,
          dataAnonymized: serie.dataAnonymized
        };
      }
    });
  }




  private updateTable(series: FhiDiagramSerie[]) {
    this.tableHeaderRows = this.tableService.getHeaderRows(series);
    this.tableBodyRows = this.tableService.getDataRows(series);
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
    or @Input() diagramOptions.data === undefined
    at FhiAngularHighchartsComponent.ngOnChanges
    FhiAngularHighchartsComponent can not be rendered.
    To avoid this error message:
    test for yourOptions !== undefined
    and yourOptions.data !== undefined before calling
    <fhi-angular-highcharts [diagramOptions]="yourOptions"></fhi-angular-highcharts>`;
  }

}
