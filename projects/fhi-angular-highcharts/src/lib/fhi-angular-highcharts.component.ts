import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

import { first } from 'rxjs';
import * as Highcharts from 'highcharts';
import * as Highmaps from 'highcharts/highmaps';
import { Options } from 'highcharts';
import HighchartsAccessibility from 'highcharts/modules/accessibility';

import { FhiDiagramOptions, FhiDiagramTypeIds } from './models/fhi-diagram-options.model';
import { FhiDiagramSerie } from './models/fhi-diagram-serie.model';
import { AllDiagramOptions } from './models/all-diagram-options.model';
import { FhiDiagramSerieData } from './models/fhi-diagram-serie-data.model';
import { FlaggedSerie } from './models/flagged-serie.model';
import { FlagWithDataPointName } from './models/flag-with-data-point-name.model';
import { DiagramType } from './models/diagram-type.model';

import { DiagramTypes } from './constants-and-enums/fhi-diagram-types';
import { DiagramTypeIdValues as DiagramTypeIds } from './constants-and-enums/diagram-type-ids';
import { DiagramSerieNameSeperator as Seperator } from './constants-and-enums/diagram-serie-name-seperator';
import { DiagramTypeNavIds } from './constants-and-enums/diagram-type-nav-ids';
import { DiagramTypeGroups } from './constants-and-enums/diagram-type-groups';

import { OptionsService } from './services/options.service';
import { TableService } from './services/table.service';
import { DiagramTypeService } from './services/diagram-type.service';
import { TopoJsonService } from './services/topo-json.service';

@Component({
  selector: 'fhi-angular-highcharts',
  templateUrl: './fhi-angular-highcharts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FhiAngularHighchartsComponent implements OnChanges {
  private flaggedSeries: FlaggedSerie[] = [];

  @Input() diagramOptions!: FhiDiagramOptions;
  @Output() diagramTypeNavigation = new EventEmitter<FhiDiagramTypeIds>();

  highcharts: typeof Highcharts = Highcharts;
  highmaps: typeof Highmaps = Highmaps;

  highchartsOptions!: Options;
  allDiagramOptions!: AllDiagramOptions;
  showDefaultChartTemplate = true;
  showFooter = false;
  showMap = false;
  mapCopyrightInfo!: object;
  currentDiagramTypeGroup!: string;
  diagramTypeGroups = DiagramTypeGroups;
  diagramTypeNavId = DiagramTypeNavIds;

  tableData: any;

  tableHeaderRows = [];
  tableBodyRows = [];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private optionsService: OptionsService,
    private diagramTypeService: DiagramTypeService,
    private tableService: TableService,
    private topoJsonService: TopoJsonService,
  ) {
    HighchartsAccessibility(Highcharts);
    HighchartsAccessibility(Highmaps);
  }

  ngOnChanges() {
    try {
      this.showMap = false;
      this.allDiagramOptions = this.diagramOptions;
      this.loopSeriesToUpdateAndExtractInfo();
      this.updateAvailableDiagramTypes();
      this.updateAllDiagramOptions();
      this.updateCurrentDiagramType();
      this.updateCurrentDiagramTypeGroup();

      if (this.currentDiagramTypeGroup === DiagramTypeGroups.table) {
        this.updateTable();
      } else if (this.currentDiagramTypeGroup === DiagramTypeGroups.map) {
        this.updateMap();
      } else {
        this.highchartsOptions = this.optionsService.updateOptions(this.allDiagramOptions);
      }
      this.showFooter = this.canShowFooter();
    } catch (error) {
      console.error(this.getErrorMsg(error));
    }
  }

  onDiagramTypeNavigation(diagramType: DiagramType) {
    this.diagramTypeNavigation.emit(diagramType.id as FhiDiagramTypeIds);
  }

  setDiagramTypeGroupToTable() {
    this.diagramTypeNavigation.emit(DiagramTypeIds.table as FhiDiagramTypeIds);
  }

  tableCellDataOK(data: number | string): boolean {
    if (typeof data === 'number') {
      return true;
    }
    return false;
  }

  getFlaggedDataPoints(): Array<string> {
    const flagged: Array<string> = [];
    let n = 0;
    this.flaggedSeries.forEach((serie) => {
      serie.flaggedDataPoints.forEach((dataPoint) => {
        flagged[n++] = serie.name.concat(Seperator.output, dataPoint.name);
      });
    });
    return flagged;
  }

  getMapCopyright(): object {
    return this.topoJsonService.getMapCopyright();
  }

  private loopSeriesToUpdateAndExtractInfo() {
    let n = 0;

    this.allDiagramOptions.series.forEach((serie) => {
      const decimalData = serie.data.filter(
        (dataPoint) => typeof dataPoint.y === 'number' && dataPoint.y % 1 != 0,
      );
      const flaggedData = serie.data.filter((dataPoint) => typeof dataPoint.y === 'string');
      const negativeData = serie.data.filter(
        (dataPoint) => typeof dataPoint.y === 'number' && dataPoint.y < 0,
      );

      if (flaggedData.length !== 0) {
        this.updateFlaggedSeries(serie, flaggedData, n++);
      }
      if (decimalData.length !== 0) {
        this.allDiagramOptions.seriesHasDecimalDataPoints = true;
      }
      if (negativeData.length !== 0) {
        this.allDiagramOptions.seriesHasNegativeDataPoints = true;
      }
      serie.name = this.formatSerieName(serie.name);
    });
  }

  private formatSerieName(name: string | Array<string>): string {
    if (typeof name === 'string') {
      return name.split(Seperator.input).join(Seperator.output);
    }
    return name.join(Seperator.output);
  }

  private updateFlaggedSeries(
    serie: FhiDiagramSerie,
    flaggedData: FhiDiagramSerieData[],
    index: number,
  ) {
    this.flaggedSeries[index] = {
      name: serie.name as string,
      flaggedDataPoints: this.getFlaggedDataPointsForCurrentSerie(flaggedData),
    };
  }

  private getFlaggedDataPointsForCurrentSerie(
    data: FhiDiagramSerieData[],
  ): FlagWithDataPointName[] {
    const flaggedDataPoints: FlagWithDataPointName[] = [];
    let n = 0;
    data.forEach((category) => {
      flaggedDataPoints[n++] = {
        name: category.name,
        symbol: category.y as string,
        label: 'N/A',
      };
    });
    return flaggedDataPoints;
  }

  private updateAvailableDiagramTypes() {
    this.diagramTypeService.updateDiagramTypes(
      this.allDiagramOptions.diagramTypeSubset,
      this.allDiagramOptions.mapTypeId,
      this.allDiagramOptions.series,
      this.flaggedSeries,
    );
  }

  private updateAllDiagramOptions() {
    const diagramTypeId = this.allDiagramOptions.diagramTypeId;
    const flags = this.allDiagramOptions.flags;
    const openSource = this.allDiagramOptions.openSource;

    this.allDiagramOptions = {
      ...this.allDiagramOptions,
      diagramTypeId: diagramTypeId
        ? (this.diagramTypeService.getVerifiedDiagramTypeId(diagramTypeId) as FhiDiagramTypeIds)
        : (DiagramTypeIds.table as FhiDiagramTypeIds),
      flags: flags ? flags : undefined,
      openSource: openSource === undefined || openSource ? true : false,
    };
  }

  private updateCurrentDiagramType() {
    this.allDiagramOptions.diagramType = this.diagramTypeService.getDiagramTypeById(
      this.allDiagramOptions.diagramTypeId,
    );
  }

  private updateCurrentDiagramTypeGroup() {
    if (this.allDiagramOptions.diagramTypeId === DiagramTypes.table.id) {
      this.currentDiagramTypeGroup = DiagramTypeGroups.table;
      return;
    }
    if (
      this.allDiagramOptions.diagramTypeId === DiagramTypeIds.map &&
      this.diagramTypeService.mapTypes.length !== 0
    ) {
      this.currentDiagramTypeGroup = DiagramTypeGroups.map;
      return;
    }
    this.currentDiagramTypeGroup = DiagramTypeGroups.chart;
    this.showDefaultChartTemplate = !this.showDefaultChartTemplate;
  }

  private updateTable() {
    const series: FhiDiagramSerie[] = this.allDiagramOptions.series;

    this.tableHeaderRows = this.tableService.getHeaderRows(series);
    this.tableBodyRows = this.tableService.getDataRows(series);

    // this.tableData = this.tableService.getTable(series, 'Use series as table rows');
    this.tableData = this.tableService.getTable(series, 'Use series as table columns');
  }

  private updateMap() {
    const mapTypeId = this.allDiagramOptions.mapTypeId;

    if (this.highmaps.maps && this.highmaps.maps[mapTypeId]) {
      this.topoJsonService.setCurrentMapTypeId(mapTypeId);
      this.highchartsOptions = this.optionsService.updateOptions(this.allDiagramOptions);
      this.showMap = true;
      this.changeDetector.detectChanges();
    } else {
      this.loadMap(mapTypeId);
    }
  }

  private loadMap(mapTypeId: string) {
    if (this.highmaps.maps === undefined) {
      this.highmaps.maps = [];
    }
    this.topoJsonService
      .getMap(mapTypeId)
      .pipe(first())
      .subscribe({
        next: (map) => {
          if (map !== undefined) {
            this.highmaps.maps[mapTypeId] = map;
            this.topoJsonService.addMap(map, mapTypeId);
            this.updateMap();
          }
        },
        error: (error) => {
          console.error('ERROR:', error);
        },
      });
  }

  private canShowFooter(): boolean {
    if (this.showMap && !this.allDiagramOptions.openSource) {
      return true;
    }
    if (this.flaggedSeries.length !== 0) {
      return true;
    }
    if (this.allDiagramOptions.lastUpdated !== undefined) {
      return true;
    }
    if (this.allDiagramOptions.disclaimer !== undefined) {
      return true;
    }
    if (
      this.allDiagramOptions.creditsHref !== undefined &&
      this.allDiagramOptions.creditsText !== undefined
    ) {
      return true;
    }
    return false;
  }

  private getErrorMsg(error: any) {
    return `ERROR: @Input() diagramOptions === undefined,
    diagramOptions.title === undefined or diagramOptions.series === undefined
    at FhiAngularHighchartsComponent.ngOnChanges()
    FhiAngularHighchartsComponent can not be rendered.

    To avoid this error message:
    Make sure [yourOptions] are valid before calling template:
    <fhi-angular-highcharts [diagramOptions]="yourOptions"></fhi-angular-highcharts>

    If [yourOptions] are in accordance with specification; contact maintainer of
    package https://www.npmjs.com/package/@folkehelseinstituttet/angular-highcharts

    Stacktrace:
    ${error}`;
  }
}
