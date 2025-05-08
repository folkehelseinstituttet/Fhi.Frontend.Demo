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
import { FlaggedSerie } from './models/flagged-serie.model';
import { DownloadService } from './services/download.service';
import { MetadataForSeriesService } from './services/metadata-for-series.service';

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
    private metadataForSeriesService: MetadataForSeriesService,
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
        this.metadataForSeriesService.updateMetadataForSeries(
          serie,
          this.diagramOptionsInternal.units,
        );
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
        this.diagramOptionsInternal,
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
    this.metadataForSeriesService.resetMetadataForSeries();
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
    this.highchartsOptions = this.optionsService.updateOptions(this.diagramOptionsInternal);
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
      this.highchartsOptions = this.optionsService.updateOptions(this.diagramOptionsInternal);
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
