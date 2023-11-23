import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { first } from 'rxjs';
import * as Highcharts from 'highcharts';
import * as Highmaps from 'highcharts/highmaps';
import { Options } from 'highcharts';
import HighchartsAccessibility from 'highcharts/modules/accessibility';

import {
  Data,
  FhiAllDiagramOptions,
  FhiDiagramOptions,
  FhiDiagramSerie,
  FlagWithDataPointName,
  FlaggedSerie,
} from './fhi-diagram.models';

import { OptionsService } from './services/options.service';
import { TableService } from './services/table.service';
import { DiagramTypeService } from './services/diagram-type.service';
import { GeoJsonService } from './services/geo-json.service';

import { FhiDiagramType } from './fhi-diagram.models';
import {
  FhiDiagramTypes,
  FhiDiagramTypeId,
  FhiDiagramTypeGroups,
} from './fhi-diagram-type.constants';
import { FhiDiagramTypeNavId } from './fhi-diagram-type-navs/fhi-diagram-type-nav.constants';
import { FhiDiagramSerieNameSeperator as Seperator } from './fhi-diagram-serie-name-seperator.constant';

@Component({
  selector: 'fhi-angular-highcharts',
  templateUrl: './fhi-angular-highcharts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FhiAngularHighchartsComponent {
  private flaggedSeries: FlaggedSerie[] = [];

  @Input() diagramOptions!: FhiDiagramOptions;
  @Output() diagramTypeNavigation = new EventEmitter<string>();

  highcharts: typeof Highcharts = Highcharts;
  highmaps: typeof Highmaps = Highmaps;

  highchartsOptions!: Options;
  allDiagramOptions!: FhiAllDiagramOptions;
  showDefaultChartTemplate = true;
  showFooter = false;
  showMap = false;
  currentDiagramTypeGroup!: string;
  diagramTypeGroups = FhiDiagramTypeGroups;
  diagramTypeNavId = FhiDiagramTypeNavId;
  tableHeaderRows = [];
  tableBodyRows = [];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private optionsService: OptionsService,
    private diagramTypeService: DiagramTypeService,
    private tableService: TableService,
    private geoJsonService: GeoJsonService,
  ) {
    HighchartsAccessibility(Highcharts);
    HighchartsAccessibility(Highmaps);
  }

  ngOnChanges() {
    try {
      this.allDiagramOptions = this.diagramOptions;
      this.loopSeriesToUpdateAndExtractInfo();
      this.updateAvailableDiagramTypes();
      this.updateAllDiagramOptions();
      this.updateCurrentDiagramType();
      this.updateCurrentDiagramTypeGroup();

      if (this.currentDiagramTypeGroup === FhiDiagramTypeGroups.table) {
        this.updateTable();
      } else if (this.currentDiagramTypeGroup === FhiDiagramTypeGroups.map) {
        this.updateMap();
      } else {
        this.highchartsOptions = this.optionsService.updateOptions(
          this.allDiagramOptions,
        );
      }
      this.showFooter = this.canShowFooter();
    } catch (error) {
      console.error(this.getErrorMsg(error));
    }
  }

  onDiagramTypeNavigation(diagramType: FhiDiagramType) {
    this.diagramTypeNavigation.emit(diagramType.id);
  }

  setDiagramTypeGroupToTable() {
    this.diagramTypeNavigation.emit(FhiDiagramTypeId.table);
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

  private loopSeriesToUpdateAndExtractInfo() {
    let n = 0;

    this.allDiagramOptions.series.forEach((serie) => {
      const decimalData = serie.data.filter(
        (dataPoint) => typeof dataPoint.y === 'number' && dataPoint.y % 1 != 0,
      );
      const flaggedData = serie.data.filter(
        (dataPoint) => typeof dataPoint.y === 'string',
      );
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
    flaggedData: Data[],
    index: number,
  ) {
    this.flaggedSeries[index] = {
      name: serie.name as string,
      flaggedDataPoints: this.getFlaggedDataPointsForCurrentSerie(flaggedData),
    };
  }

  private getFlaggedDataPointsForCurrentSerie(
    data: Data[],
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
        ? this.diagramTypeService.getVerifiedDiagramTypeId(diagramTypeId)
        : FhiDiagramTypeId.table,
      flags: flags ? flags : undefined,
      openSource: openSource === undefined || openSource ? true : false,
    };
  }

  private updateCurrentDiagramType() {
    this.allDiagramOptions.diagramType =
      this.diagramTypeService.getDiagramTypeById(
        this.allDiagramOptions.diagramTypeId,
      );
  }

  private updateCurrentDiagramTypeGroup() {
    if (this.allDiagramOptions.diagramTypeId === FhiDiagramTypes.table.id) {
      this.currentDiagramTypeGroup = FhiDiagramTypeGroups.table;
      return;
    }
    if (
      this.allDiagramOptions.diagramTypeId === FhiDiagramTypeId.map &&
      this.diagramTypeService.mapTypes.length !== 0
    ) {
      this.currentDiagramTypeGroup = FhiDiagramTypeGroups.map;
      return;
    }
    this.currentDiagramTypeGroup = FhiDiagramTypeGroups.chart;
    this.showDefaultChartTemplate = !this.showDefaultChartTemplate;
  }

  private updateTable() {
    const series: FhiDiagramSerie[] = this.allDiagramOptions.series;
    this.tableHeaderRows = this.tableService.getHeaderRows(series);
    this.tableBodyRows = this.tableService.getDataRows(series);
  }

  private updateMap() {
    const mapTypeId = this.allDiagramOptions.mapTypeId as string;
    this.showMap = false;

    if (this.highmaps.maps && this.highmaps.maps[mapTypeId]) {
      this.highchartsOptions = this.optionsService.updateOptions(
        this.allDiagramOptions,
      );
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
    this.geoJsonService
      .getMap(mapTypeId)
      .pipe(first())
      .subscribe({
        next: (map) => {
          if (map !== undefined) {
            this.highmaps.maps[mapTypeId] = map;
            this.geoJsonService.updateMapFeatures(
              this.highmaps.maps[mapTypeId],
            );
            this.updateMap();
          }
        },
        error: (error) => {
          console.log('ERROR:', error);
        },
      });
  }

  private canShowFooter(): boolean {
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
