import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Options } from 'highcharts';
import HighchartsMap from 'highcharts/modules/map';
import HighchartsAccessibility from 'highcharts/modules/accessibility';

import { Data, FhiDiagramOptions, FhiDiagramSerie, FlagWithCategoryName, FlaggedSerie } from './fhi-diagram/fhi-diagram.models';
import { OptionsService } from './services/options.service';
import { TableService } from './services/table.service';
import { DiagramTypeService } from './services/diagram-type.service';

import { FhiDiagramType } from './fhi-diagram/fhi-diagram.models';
import { FhiDiagramTypes, FhiDiagramTypeGroups } from './fhi-diagram/fhi-diagram-types';
import { FhiDiagramTypeNavId } from './fhi-diagram-type-navs/fhi-diagram-type-nav.constants';
import { FhiDiagramTypeId } from './fhi-diagram/fhi-diagram-type-id';

@Component({
  selector: 'fhi-angular-highcharts',
  templateUrl: './fhi-angular-highcharts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FhiAngularHighchartsComponent {
  private diagramType: FhiDiagramType;

  // TODO: clean up list (pub/priv, H -> h, order)

  Highcharts: typeof Highcharts = Highcharts;
  highchartsOptions!: Options;

  flaggedSeries: FlaggedSerie[] = [];
  flaggedCategoriesForChartOrMap!: Array<string>;
  // TODO: flaggedCategoriesForChartOrMap -> flaggedDataPoints

  allMapsLoaded = false;
  currentDiagramTypeGroup!: string;
  diagramTypeGroups = FhiDiagramTypeGroups;
  diagramTypeNavId = FhiDiagramTypeNavId;
  numOfDimensions!: number;
  numOfSeries!: number;
  showDefaultChartTemplate = true;
  tableHeaderRows = new Array();
  tableBodyRows = new Array();
  showFooter = false;

  @Input() diagramOptions!: FhiDiagramOptions;
  @Output() navigateToDiagramType = new EventEmitter<string>();



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
      this.updateDiagramOptions();
      this.updateFlaggedSeries();
      this.updateCurrentDiagramType();
      this.updateCurrentDiagramTypeGroup();
      this.updateAvailableDiagramTypes();

      if (this.currentDiagramTypeGroup === FhiDiagramTypeGroups.table) {
        this.updateTable();
      } else {
        this.highchartsOptions = this.optionsService
          .updateOptions(this.diagramOptions, this.diagramType, this.allMapsLoaded);

        this.updateFlaggedCategoriesInChartOrMap();
      }
      this.showFooter = this.canShowFooter();

    } catch (error) {
      // console.error(error); //DEBUGGING
      console.error(this.getErrorMsg());
    }
  }

  // TODO: onDiagramTypeNav -> onDiagramTypeNavigation?
  onDiagramTypeNavigation(diagramType: FhiDiagramType) {
    this.navigateToDiagramType.emit(diagramType.id);
  }

  setDiagramTypeGroupToTable() {
    this.navigateToDiagramType.emit(FhiDiagramTypeId.table);
  }

  tableCellDataOK(data: number | string): boolean {
    if (typeof data === "number") {
      return true;
    }
    return false;
  }

  // getFlaggedDataPoints() {
  // }

  private updateDiagramOptions() {
    const diagramTypeId = this.diagramOptions.diagramTypeId;
    const flags = this.diagramOptions.flags;
    const openSource = this.diagramOptions.openSource;

    this.diagramOptions = {
      ...this.diagramOptions,
      diagramTypeId: (diagramTypeId) ? diagramTypeId : FhiDiagramTypeId.table,
      flags: (flags) ? flags : undefined,
      openSource: (openSource === undefined || openSource) ? true : false
    }
  }

  private updateFlaggedSeries() {
    let n = 0;
    this.diagramOptions.series.forEach((serie) => {
      const data = serie.data.filter(dataPoint => typeof dataPoint.y === 'string');
      if (data.length !== 0) {
        this.flaggedSeries[n++] = {
          name: serie.name,
          flaggedCatgories: this.getFlaggedCatgories(data)
        };
      }
    });
  }

  // TODO: getFlaggedCatgories -> getFlaggedDataPoints
  private getFlaggedCatgories(data: Data[]): FlagWithCategoryName[] {
    const flaggedCatgories: FlagWithCategoryName[] = [];
    let n = 0;
    data.forEach(category => {
      flaggedCatgories[n++] = {
        name: category.name,
        symbol: category.y as string,
        label: 'N/A' // TODO: match label to symbol from Flag
      };
    });
    return flaggedCatgories;
  }

  private updateFlaggedCategoriesInChartOrMap() {
    const flagged: Array<string> = [];
    let n = 0;
    this.flaggedSeries.forEach(serie => {
      serie.flaggedCatgories.forEach(category => {
        flagged[n++] = serie.name.concat(', ', category.name);
      });
    });
    // console.log('flagged', flagged);
    this.flaggedCategoriesForChartOrMap = flagged;
  }

  private updateCurrentDiagramType() {
    this.diagramType = this.diagramTypeService
      .getDiagramTypeById(this.diagramOptions.diagramTypeId);
  }

  private updateCurrentDiagramTypeGroup() {
    const diagramTypeId = this.diagramOptions.diagramTypeId;
    if (diagramTypeId === FhiDiagramTypes.table.id) {
      this.currentDiagramTypeGroup = FhiDiagramTypeGroups.table;
      return;
    }
    if (this.diagramType.isMap) {
      this.currentDiagramTypeGroup = FhiDiagramTypeGroups.map;
      return;
    }
    this.showDefaultChartTemplate = !this.showDefaultChartTemplate;
    this.currentDiagramTypeGroup = FhiDiagramTypeGroups.chart
  }

  private updateAvailableDiagramTypes() {
    this.diagramTypeService.updateDiagramTypes(this.diagramOptions.series, this.flaggedSeries);
  }

  private updateTable() {
    const series: FhiDiagramSerie[] = this.diagramOptions.series;
    this.tableHeaderRows = this.tableService.getHeaderRows(series);
    this.tableBodyRows = this.tableService.getDataRows(series);
  }

  private canShowFooter(): boolean {
    if (this.diagramOptions.openSource) {
      return false;
    }
    if (this.flaggedSeries.length !== 0) {
      return true;
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

  private getErrorMsg() {
    return `ERROR: @Input() diagramOptions === undefined
    or diagramOptions.series === undefined
    at FhiAngularHighchartsComponent.ngOnChanges
    FhiAngularHighchartsComponent can not be rendered.

    To avoid this error message:
    Make sure [yourOptions] are valid before calling template:
    <fhi-angular-highcharts [diagramOptions]="yourOptions"></fhi-angular-highcharts>

    If [yourOptions] are in accordance with specification; contact maintainer of
    package https://www.npmjs.com/package/@folkehelseinstituttet/angular-highcharts`;
  }

}
