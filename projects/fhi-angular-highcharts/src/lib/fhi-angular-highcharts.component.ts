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
import { cloneDeep } from 'lodash-es';

import * as Highcharts from 'highcharts';
import * as Highmaps from 'highcharts/highmaps';
import { Chart, Options } from 'highcharts';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsOfflineExporting from 'highcharts/modules/offline-exporting';

import { FhiDiagramOptions, FhiDiagramTypeIds } from './models/fhi-diagram-options.model';
import { FhiDiagramSerie } from './models/fhi-diagram-serie.model';
import { FhiDiagramSerieData } from './models/fhi-diagram-serie-data.model';
import { FlagWithDataPointName } from './models/flag-with-data-point-name.model';
import { DiagramType } from './models/diagram-type.model';

import { DiagramTypeIdValues as DiagramTypeIds } from './constants-and-enums/diagram-type-ids';
import { DiagramSerieNameSeperator as Seperator } from './constants-and-enums/diagram-serie-name-seperator';
import { DiagramTypeGroupNames } from './constants-and-enums/diagram-type-groups';

import { OptionsService } from './services/options.service';
import { TableService } from './services/table.service';
import { DiagramTypeGroupService } from './services/diagram-type-group.service';
import { TopoJsonService } from './services/topo-json.service';
import { TableData } from './models/table-data.model';
import { DiagramTypeGroup } from './models/diagram-type-group.model';
import { MetadataForSerie } from './models/metadata-for-serie.model';
import { FlaggedSerie } from './models/flagged-serie.model';
import { DownloadService } from './services/download.service';

enum ControlsPopoverMenuActions {
  downloadSvg = 'downloadSvg',
}

@Component({
  selector: 'fhi-angular-highcharts',
  templateUrl: './fhi-angular-highcharts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class FhiAngularHighchartsComponent implements OnChanges {
  private allSerieNames: string[] = [];
  private chartInstance!: Chart;

  @Input({ required: true }) diagramOptions!: FhiDiagramOptions;

  @Output() diagramTypeNavigation = new EventEmitter<FhiDiagramTypeIds>();
  @Output() metadataButtonClick = new EventEmitter<void>();

  highcharts: typeof Highcharts = Highcharts;
  highmaps: typeof Highmaps = Highmaps;
  highchartsOptions!: Options;

  diagramOptionsInternal!: FhiDiagramOptions;
  activeDiagramTypeGroup!: DiagramTypeGroup;
  diagramTypeGroups!: DiagramTypeGroup[];
  diagramTypeGroupNames = DiagramTypeGroupNames;
  flaggedSeries: FlaggedSerie[];
  metadataForSeries: MetadataForSerie[];
  tableData: TableData;

  showDefaultChartTemplate: boolean;
  showDiagramTypeDisabledWarning: boolean;
  showDiagramTypeNav: boolean;
  showDownloadButton: boolean;
  showDuplicateSerieNameError: boolean;
  showFooter: boolean;
  showFullScreenButton: boolean;
  showMap: boolean;
  showMetadataButton: boolean;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private downloadService: DownloadService,
    private optionsService: OptionsService,
    private diagramTypeGroupService: DiagramTypeGroupService,
    private tableService: TableService,
    private topoJsonService: TopoJsonService,
  ) {
    HighchartsAccessibility(Highcharts);
    HighchartsExporting(Highcharts);
    HighchartsOfflineExporting(Highcharts);

    HighchartsAccessibility(Highmaps);
    HighchartsExporting(Highmaps);
    HighchartsOfflineExporting(Highmaps);

    this.highcharts.setOptions({
      lang: {
        decimalPoint: ',',
      },
    });
  }

  ngOnChanges() {
    this.diagramOptionsInternal = cloneDeep(this.diagramOptions);
    this.resetDiagramState();

    try {
      this.diagramOptionsInternal.series.forEach((serie) => {
        serie.name = this.formatSerieName(serie.name);
        this.findDuplicateSerieNames(serie.name);
        this.testForFlaggedDataAndUpdateFlaggedSeries(serie);
        this.updateMetadataForSeries(serie);
        this.updateDecimalCountBasedOnUnits(serie);
      });
      this.updateDiagramTypeGroups();
      this.updateDiagramOptions();
      this.updateDiagramState();
    } catch (error) {
      console.error(this.getErrorMsg(error));
    }
  }

  onChartInstance(chartInstance: Chart) {
    this.chartInstance = chartInstance;
  }

  onControlsPopoverMenuAction(actionName: string) {
    if (actionName === ControlsPopoverMenuActions.downloadSvg) {
      this.downloadService.downloadImage(
        this.chartInstance,
        'image/svg+xml',
        this.diagramOptionsInternal.title,
      );
    }
  }

  onDiagramTypeNavigation(diagramType: DiagramType) {
    this.diagramTypeNavigation.emit(diagramType.id as FhiDiagramTypeIds);
  }

  onMetadataButtonClick() {
    this.metadataButtonClick.emit();
  }

  setDiagramTypeGroupToTable() {
    this.diagramTypeNavigation.emit(DiagramTypeIds.table as FhiDiagramTypeIds);
  }

  isNumber(data: number | string): boolean {
    return typeof data === 'number';
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

  private resetDiagramState() {
    this.showDiagramTypeNav = false;
    this.showDuplicateSerieNameError = false;
    this.showFullScreenButton = false;
    this.showDiagramTypeDisabledWarning = false;
    this.showFooter = false;
    this.showMap = false;
    this.showMetadataButton = false;
    this.allSerieNames = [];
    this.flaggedSeries = [];
    this.metadataForSeries = [];
  }

  private formatSerieName(name: string | Array<string>): string {
    if (typeof name === 'string') {
      return name.split(Seperator.input).join(Seperator.output);
    }
    return name.join(Seperator.output);
  }

  private findDuplicateSerieNames(serieName: string) {
    if (this.allSerieNames.find((name) => name === serieName)) {
      this.showDuplicateSerieNameError = true;
    }
    this.allSerieNames.push(serieName);
  }

  private testForFlaggedDataAndUpdateFlaggedSeries(serie: FhiDiagramSerie) {
    const flaggedData = serie.data.filter((dataPoint) => typeof dataPoint.y === 'string');
    if (flaggedData.length !== 0) {
      this.updateFlaggedSeries(serie, flaggedData);
    }
  }

  private updateFlaggedSeries(serie: FhiDiagramSerie, flaggedData: FhiDiagramSerieData[]) {
    this.flaggedSeries.push({
      name: serie.name as string,
      flaggedDataPoints: this.getFlaggedDataPointsForCurrentSerie(flaggedData),
    });
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

  private updateMetadataForSeries(serie: FhiDiagramSerie) {
    this.metadataForSeries.push({
      hasDecimalData: this.serieHasDecimalDataPoints(serie),
      hasNegativeData: this.serieHasNegativeDataPoints(serie),
      hasPositiveData: this.serieHasPositiveDataPoints(serie),
      maxDecimals: this.getVerifiedMaxDecimalCount(serie),
    });
  }

  // TODO: This methode is redundant
  private updateDecimalCountBasedOnUnits(serie: FhiDiagramSerie) {
    if (!this.metadataForSeries.find((serie) => serie.hasDecimalData)) {
      return;
    }
    const maxDecimals = this.getVerifiedMaxDecimalCount(serie);

    serie.data.forEach((dataPoint) => {
      if (this.isDecimalNumber(dataPoint.y) && this.decimalCount(dataPoint.y) > maxDecimals) {
        // This solution is redundant: solved by tooltip.formatter in OptionsService
        // dataPoint.y = Number.parseFloat((dataPoint.y as number).toFixed(maxDecimals));
        // This is the solution for table
        // dataPoint.y = (dataPoint.y as number).toFixed(maxDecimals);
        // console.log('dataPoint.y', dataPoint.y);
      }
    });
  }

  // NB! getVerifiedMaxDecimalCount ForCurrentSerie!
  private getVerifiedMaxDecimalCount(serie: FhiDiagramSerie): number {
    let unit = this.diagramOptionsInternal.units?.find((unit) => unit.id === serie.unitId);

    if (!unit && this.diagramOptionsInternal.units?.length === 1) {
      unit = this.diagramOptionsInternal.units[0];
    }
    if (unit?.decimals !== undefined && unit?.decimals >= 0 && unit?.decimals <= 9) {
      return unit.decimals;
    }
    if (unit?.decimals > 9) {
      console.warn(
        'Max decimal places is 9 because Highcharts tooltips fails if 10 decimals or more.',
      );
    }
    return 9;
  }

  private serieHasDecimalDataPoints(serie: FhiDiagramSerie): boolean {
    const decimalData = serie.data.filter((dataPoint) => this.isDecimalNumber(dataPoint.y));
    return decimalData.length !== 0;
  }

  private serieHasNegativeDataPoints(serie: FhiDiagramSerie): boolean {
    const negativeData = serie.data.filter(
      (dataPoint) => typeof dataPoint.y === 'number' && dataPoint.y < 0,
    );
    return negativeData.length > 0;
  }

  private serieHasPositiveDataPoints(serie: FhiDiagramSerie): boolean {
    const positiveData = serie.data.filter(
      (dataPoint) => typeof dataPoint.y === 'number' && dataPoint.y >= 0,
    );
    return positiveData.length > 0;
  }

  // TODO: decimalService?
  private decimalCount(value: number | string): number {
    if (typeof value !== 'number') return 0;
    if (Math.floor(value) === value) return 0;
    return value.toString().split('.')[1].length || 0;
  }

  private isDecimalNumber(value: number | string): boolean {
    return typeof value === 'number' && !Number.isInteger(value);
  }

  private updateDiagramTypeGroups() {
    this.diagramTypeGroups = this.diagramTypeGroupService.getDiagramTypeGroups(
      this.diagramOptionsInternal,
      this.flaggedSeries,
      this.diagramTypeGroups,
    );
    this.activeDiagramTypeGroup = this.diagramTypeGroupService.getActiveDiagramTypeGroup(
      this.diagramTypeGroups,
    );
  }

  private updateDiagramOptions() {
    const footer = this.diagramOptionsInternal.footer;
    const openSource = this.diagramOptionsInternal.openSource;

    this.diagramOptionsInternal = {
      ...this.diagramOptionsInternal,
      activeDiagramType: this.activeDiagramTypeGroup.diagramType.id as FhiDiagramTypeIds,
      footer: footer ? footer : undefined,
      openSource: openSource === undefined || openSource ? true : false,
    };
  }

  private updateDiagramState() {
    const diagramTypeIsDisabled = this.diagramTypeGroupService.getDiagramTypeIsDisabled(
      this.diagramTypeGroups,
      this.diagramOptionsInternal.activeDiagramType,
    );
    this.showDiagramTypeDisabledWarning = diagramTypeIsDisabled;
    this.showDownloadButton = diagramTypeIsDisabled ? false : this.canShowDownloadButton();
    this.showFooter = diagramTypeIsDisabled ? false : this.canShowFooter();
    this.showFullScreenButton = !!this.diagramOptionsInternal.controls?.fullScreenButton?.show;
    this.showMetadataButton = !!this.diagramOptionsInternal.controls?.metadataButton?.show;
    this.showDiagramTypeNav = !!this.diagramOptionsInternal.controls?.navigation?.show;

    if (!diagramTypeIsDisabled) {
      this.updateDiagram();
    } else {
      const activeDiagramType = this.diagramOptionsInternal.activeDiagramType;
      const msg = this.diagramTypeGroupService.getDiagramTypeDisabledWarningMsg(
        this.diagramOptionsInternal.activeDiagramType,
      );
      console.warn(`Kan ikke vise diagramtype "${activeDiagramType}" fordi "${msg}"`);
    }
  }

  private updateDiagram() {
    if (this.activeDiagramTypeGroup.name === DiagramTypeGroupNames.table) {
      this.updateTable();
    } else if (this.activeDiagramTypeGroup.name === DiagramTypeGroupNames.map) {
      this.updateMap();
    } else {
      this.updateChart();
    }
  }

  private updateChart() {
    this.showDefaultChartTemplate = !this.showDefaultChartTemplate;
    this.highchartsOptions = this.optionsService.updateOptions(
      this.diagramOptionsInternal,
      this.metadataForSeries,
    );
  }

  private updateTable() {
    const series: FhiDiagramSerie[] = this.diagramOptionsInternal.series;
    this.tableData = this.tableService.getTable(
      series,
      this.diagramOptionsInternal.tableOrientation,
    );
  }

  private updateMap() {
    const mapTypeId = this.diagramOptionsInternal.activeDiagramType;

    if (this.highmaps.maps && this.highmaps.maps[mapTypeId]) {
      this.topoJsonService.setCurrentMapTypeId(mapTypeId);
      this.highchartsOptions = this.optionsService.updateOptions(
        this.diagramOptionsInternal,
        this.metadataForSeries,
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
          console.error('TopoJson map loading error:', error);
        },
      });
  }

  private canShowDownloadButton(): boolean {
    return (
      !!this.diagramOptionsInternal.controls?.downloadButton?.show &&
      this.diagramOptionsInternal.activeDiagramType !== 'table'
    );
  }

  private canShowFooter(): boolean {
    if (this.showMap && !this.diagramOptionsInternal.openSource) {
      return true;
    }
    if (this.diagramOptionsInternal.footer?.flags) {
      return true;
    }
    if (this.diagramOptionsInternal.footer?.lastUpdated) {
      return true;
    }
    if (this.diagramOptionsInternal.footer?.disclaimer) {
      return true;
    }
    if (this.diagramOptionsInternal.footer?.credits) {
      return true;
    }
    if (this.diagramOptionsInternal.units?.length > 0) {
      return true;
    }
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private getErrorMsg(error: any) {
    return `${error}

    To avoid this error message:
    Make sure [yourOptions] are valid before calling template:
    <fhi-angular-highcharts [diagramOptions]="yourOptions"></fhi-angular-highcharts>

    If [yourOptions] are in accordance with specification, contact maintainer of package:
    https://www.npmjs.com/package/@folkehelseinstituttet/angular-highcharts

    API documentation:
    https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/blob/main/projects/fhi-angular-highcharts/README.md#api`;
  }
}
