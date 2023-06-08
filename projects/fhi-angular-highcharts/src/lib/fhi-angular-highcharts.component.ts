import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Options } from 'highcharts';
import HighchartsMap from 'highcharts/modules/map';
import HighchartsAccessibility from 'highcharts/modules/accessibility';

import { Data, DataAnonymizedSerie, FhiDiagramOptions, FhiDiagramSerie, FlagWithCategoryName, FlaggedSerie } from './fhi-diagram/fhi-diagram.models';
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
  flaggedSeries: FlaggedSerie[] = [];
  flaggedCategoriesInChartOrMap!: string;

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
      this.diagramOptions = this.updateDiagramOptions();
      this.currentDiagramTypeGroup = this.getCurrentDiagramTypeGroup();
      this.updateSeriesInDiagramTypeService();
      this.updateFlaggedSeries();

      if (this.currentDiagramTypeGroup === FhiDiagramTypeGroups.table) {
        this.updateTable();
        this.updateAnonymizedForTable();
      } else {
        this.highchartsOptions = this.optionsService.updateOptions(this.diagramOptions, this.allMapsLoaded);
        this.updateAnonymizedForChartOrMap();
      }
      this.showFooter = this.canShowFooter();

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

  setDiagramTypeGroupToTable() {
    console.log('setDiagramTypeGroupToTable() !');
  }

  private updateDiagramOptions(): FhiDiagramOptions {
    const options = this.diagramOptions;
    return {
      ...options,
      diagramType: (options.diagramType) ? options.diagramType : FhiDiagramTypes.table,
      openSource: (options.openSource === undefined || options.openSource) ? true : false
    }
  }

  private updateAnonymizedForTable() {
  }
  private updateAnonymizedForChartOrMap() {
    this.diagramOptions.data.forEach((serie, index) => {

      console.log('serie', serie);

      if (serie.dataAnonymized[0] !== undefined) {
        this.anonymizedSeries[index] = {
          name: serie.name,
          dataAnonymized: serie.dataAnonymized
        };
      }
    });
  }

  private updateFlaggedSeries() {
    let n = 0;
    this.diagramOptions.data.forEach((serie, index) => {
      const test = serie.data.filter(dataPoint => typeof dataPoint.y === 'string');
      if (test.length !== 0) {
        this.flaggedSeries[n++] = {
          name: serie.name,
          flaggedCatgories: this.getFlaggedCatgories(test)
        };
      }
    });

    console.log('this.flaggedSeries', this.flaggedSeries);
  }

  // TODO: Data[] -> FhiDiagramSerieData[]?
  private getFlaggedCatgories(test: Data[]): FlagWithCategoryName[] {
    const flaggedCatgories: FlagWithCategoryName[] = [];
    let n = 0;
    test.forEach(category => {
      flaggedCatgories[n++] = {
        name: category.name,
        symbol: category.y as string,
        label: 'N/A'
      };
    });
    return flaggedCatgories;
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

  private updateTable() {
    const series: FhiDiagramSerie[] = this.diagramOptions.data;
    this.tableHeaderRows = this.tableService.getHeaderRows(series);
    this.tableBodyRows = this.tableService.getDataRows(series);
  }

  private getCurrentDiagramTypeGroup(): string {
    const diagramType: FhiDiagramType = this.diagramOptions.diagramType;
    if (diagramType.id === FhiDiagramTypes.table.id) {
      return FhiDiagramTypeGroups.table;
    }
    if (diagramType.isMap) {
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
