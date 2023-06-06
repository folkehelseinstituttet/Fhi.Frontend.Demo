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

  anonymizedSeries: DataAnonymizedSerie[] = [];
  allMapsLoaded = false;
  currentDiagramTypeGroup!: string;
  diagramTitle!: string;
  diagramTypeGroups = FhiDiagramTypeGroups;
  diagramTypeNavs = FhiDiagramTypeNavs;
  numOfDimensions!: number;
  numOfSeries!: number;
  showDefaultChartTemplate = true;
  tableHeaderRows = new Array();
  tableBodyRows = new Array();
  footerLastUpdated!: string;
  footerDisclaimer!: string;
  footerCreditsHref!: string;
  footerCreditsText!: string;
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
      this.diagramTypeService.series = this.diagramOptions.data;
      this.diagramOptions = this.setOptionalFhiDiagramOptions(this.diagramOptions);
      this.diagramTitle = this.diagramOptions.title;
      this.currentDiagramTypeGroup = this.getCurrentDiagramTypeGroup(this.diagramOptions.diagramType);

      if (this.currentDiagramTypeGroup === FhiDiagramTypeGroups.table) {
        this.updateTable(this.diagramTypeService.series);
      } else {
        this.highchartsOptions = this.optionsService.updateOptions(this.diagramOptions, this.allMapsLoaded);
        this.setAnonymized()
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

  private setOptionalFhiDiagramOptions(diagramOptions: FhiDiagramOptions): FhiDiagramOptions {
    const d = diagramOptions;
    return {
      ...d,
      diagramType: (d.diagramType) ? d.diagramType : FhiDiagramTypes.table,
      openSource: (d.openSource) ? d.openSource : true,
    }
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
