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
import { Chart, Options } from 'highcharts';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsOfflineExporting from 'highcharts/modules/offline-exporting';

import { FhiDiagramOptions, FhiDiagramTypeIds } from './models/fhi-diagram-options.model';
import { FhiDiagramSerie } from './models/fhi-diagram-serie.model';
import { FhiDiagramSerieData } from './models/fhi-diagram-serie-data.model';
import { FlagWithDataPointName } from './models/flag-with-data-point-name.model';
import { DiagramType } from './models/diagram-type.model';

import {
  ChartTypeIds,
  DiagramTypeIdValues as DiagramTypeIds,
  MapTypeIds,
} from './constants-and-enums/diagram-type-ids';
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

@Component({
  selector: 'fhi-angular-highcharts',
  templateUrl: './fhi-angular-highcharts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FhiAngularHighchartsComponent implements OnChanges {
  private allSerieNames: string[] = [];
  private chartInstance!: Chart;

  @Input() diagramOptions!: FhiDiagramOptions;

  @Output() diagramTypeNavigation = new EventEmitter<FhiDiagramTypeIds>();
  @Output() metadataButtonClick = new EventEmitter<void>();

  highcharts: typeof Highcharts = Highcharts;
  highmaps: typeof Highmaps = Highmaps;
  highchartsOptions!: Options;

  activeDiagramTypeGroup!: DiagramTypeGroup;
  diagramTypeGroups!: DiagramTypeGroup[];
  diagramTypeGroupNames = DiagramTypeGroupNames;
  flaggedSeries: FlaggedSerie[];
  metadataForSeries: MetadataForSerie[];
  tableData: TableData;

  showDefaultChartTemplate: boolean;
  showDiagramTypeDisabledWarning: boolean;
  showDiagramTypeNav: boolean;
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
    HighchartsAccessibility(Highmaps);
    HighchartsExporting(Highcharts);
    HighchartsOfflineExporting(Highcharts);
    this.highcharts.setOptions({
      lang: {
        decimalPoint: ',',
      },
    });
  }

  ngOnChanges() {
    this.tmpAdapterForDeprecatedDiagramOptions();

    try {
      this.resetDiagramState();
      this.diagramOptions.series.forEach((serie) => {
        serie.name = this.formatSerieName(serie.name);
        this.findDuplicateSerieNames(serie.name);
        this.testForFlaggedDataAndUpdateFlaggedSeries(serie);
        this.updateMetadataForSeries(serie);
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

  onDownloadButtonClick() {
    // MIMEtype: ExportingMimeTypeValue
    const MIMEtype = 'image/svg+xml';
    this.downloadService.downloadImage(this.chartInstance, MIMEtype, this.diagramOptions.title);
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
      decimals: this.getVerifiedMaxDecimalCount(serie),
      hasDecimalData: this.serieHasDecimalDataPoints(serie),
      hasNegativeData: this.serieHasNegativeDataPoints(serie),
    });
  }

  private getVerifiedMaxDecimalCount(serie: FhiDiagramSerie): number {
    let unit = this.diagramOptions.units?.find((unit) => unit.id === serie.unitId);

    if (!unit && this.diagramOptions.units?.length === 1) {
      unit = this.diagramOptions.units[0];
    }
    if (unit?.decimals >= 0 && unit?.decimals <= 12) {
      return unit.decimals;
    }
    if (unit?.decimals > 12) {
      console.warn('Max decimal places is 12 due to loss of precision at runtime!');
    }
    return 12;
  }

  private serieHasDecimalDataPoints(serie: FhiDiagramSerie): boolean {
    const decimalData = serie.data.filter(
      (dataPoint) => typeof dataPoint.y === 'number' && dataPoint.y % 1 != 0,
    );
    if (decimalData.length !== 0) {
      return true;
    }
    return false;
  }

  private serieHasNegativeDataPoints(serie: FhiDiagramSerie): boolean {
    const negativeData = serie.data.filter(
      (dataPoint) => typeof dataPoint.y === 'number' && dataPoint.y < 0,
    );
    if (negativeData.length !== 0) {
      return true;
    }
    return false;
  }

  private updateDiagramTypeGroups() {
    this.diagramTypeGroups = this.diagramTypeGroupService.getDiagramTypeGroups(
      this.diagramOptions,
      this.flaggedSeries,
      this.diagramTypeGroups,
    );
    this.activeDiagramTypeGroup = this.diagramTypeGroupService.getActiveDiagramTypeGroup(
      this.diagramTypeGroups,
    );
  }

  private updateDiagramOptions() {
    const activeDiagramType = this.diagramOptions.activeDiagramType;
    const footer = this.diagramOptions.footer;
    const openSource = this.diagramOptions.openSource;

    this.diagramOptions = {
      ...this.diagramOptions,
      activeDiagramType: activeDiagramType
        ? activeDiagramType
        : (DiagramTypeIds.table as FhiDiagramTypeIds),
      footer: footer ? footer : undefined,
      openSource: openSource === undefined || openSource ? true : false,
    };
  }

  private updateDiagramState() {
    const diagramTypeIsDisabled = this.diagramTypeGroupService.diagramTypeIsDisabled(
      this.diagramTypeGroups,
      this.diagramOptions.activeDiagramType,
    );
    this.showDiagramTypeDisabledWarning = diagramTypeIsDisabled ? true : false;
    this.showFooter = diagramTypeIsDisabled ? false : this.canShowFooter();
    this.showFullScreenButton = !!this.diagramOptions.controls?.fullScreenButton?.show;
    this.showMetadataButton = !!this.diagramOptions.controls?.metadataButton?.show;
    this.showDiagramTypeNav = !!this.diagramOptions.controls?.navigation?.show;

    if (!diagramTypeIsDisabled) {
      this.updateDiagram();
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
      this.diagramOptions,
      this.metadataForSeries,
    );
  }

  private updateTable() {
    const series: FhiDiagramSerie[] = this.diagramOptions.series;
    this.tableData = this.tableService.getTable(
      series,
      this.diagramOptions.tableOrientation,
      this.metadataForSeries,
    );
  }

  private updateMap() {
    const mapTypeId = this.diagramOptions.activeDiagramType;

    if (this.highmaps.maps && this.highmaps.maps[mapTypeId]) {
      this.topoJsonService.setCurrentMapTypeId(mapTypeId);
      this.highchartsOptions = this.optionsService.updateOptions(
        this.diagramOptions,
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

  private canShowFooter(): boolean {
    if (this.showMap && !this.diagramOptions.openSource) {
      return true;
    }
    if (this.diagramOptions.footer?.flags && this.flaggedSeries.length !== 0) {
      return true;
    }
    if (this.diagramOptions.footer?.lastUpdated) {
      return true;
    }
    if (this.diagramOptions.footer?.disclaimer) {
      return true;
    }
    if (this.diagramOptions.footer?.credits) {
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

  // -----------------------------------------------------------------------------------------------
  // Tmp adapter for converting deprecated API properties to avoid breaking change in PR for issue:
  // https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/issues/540
  //
  // This adapter will be removed in v5
  //
  private tmpAdapterForDeprecatedDiagramOptions() {
    const opt = this.diagramOptions;
    // console.log('this.diagramOptions 1', this.diagramOptions);
    // debugger;

    // diagramTypeId & mapTypeId
    if (opt.diagramTypeId) {
      if (opt.diagramTypeId === 'map') {
        opt.activeDiagramType = opt.mapTypeId;
      } else {
        opt.activeDiagramType = opt.diagramTypeId;
      }
    }
    if (opt.activeDiagramType === 'map') {
      opt.activeDiagramType = 'mapFylker';
    }
    delete opt.diagramTypeId;
    delete opt.mapTypeId;

    // diagramTypeNavId
    if (opt.diagramTypeNavId && !opt.controls?.navigation) {
      if (!opt.controls) {
        opt.controls = {};
      }
      if (!opt.controls.navigation) {
        opt.controls.navigation = {
          show: !!opt.diagramTypeNavId,
          type: opt.diagramTypeNavId,
        };
      }
    }
    delete opt.diagramTypeNavId;

    // diagramTypeSubset
    if (opt.diagramTypeSubset && !opt.controls?.navigation?.items) {
      if (opt.diagramTypeSubset.find((type) => type === 'map')) {
        opt.diagramTypeSubset.push('mapFylker');
        opt.diagramTypeSubset = opt.diagramTypeSubset.filter((type) => type !== 'map');
      }
      opt.controls.navigation.items = {};

      if (!opt.controls.navigation.items.mapTypes) {
        opt.controls.navigation.items.mapTypes = opt.diagramTypeSubset.filter(
          (type) => type.slice(0, 3) === 'map',
        ) as (keyof typeof MapTypeIds)[];
      }
      if (!opt.controls.navigation.items.chartTypes) {
        opt.controls.navigation.items.chartTypes = opt.diagramTypeSubset.filter(
          (type) => type.slice(0, 3) !== 'map',
        ) as (keyof typeof ChartTypeIds)[];
      }
    }
    delete opt.diagramTypeSubset;

    // showFullScreenButton
    if (
      opt.showFullScreenButton !== undefined &&
      opt.controls?.fullScreenButton?.show === undefined
    ) {
      if (!opt.controls) {
        opt.controls = {};
      }
      if (!opt.controls.fullScreenButton) {
        opt.controls.fullScreenButton = {
          show: opt.showFullScreenButton,
        };
      }
    }
    delete opt.showFullScreenButton;

    // metadataButton
    if (opt.metadataButton !== undefined && opt.controls?.metadataButton?.show === undefined) {
      if (!opt.controls) {
        opt.controls = {};
      }
      if (!opt.controls.metadataButton) {
        opt.controls.metadataButton = {
          show: opt.metadataButton,
        };
      }
    }
    delete opt.metadataButton;

    // creditsHref & creditsText
    if ((opt.creditsHref || opt.creditsText) && !opt.footer?.credits) {
      if (!opt.footer) {
        opt.footer = {};
      }
      if (!opt.footer.credits) {
        opt.footer.credits = {
          href: opt.creditsHref,
          text: opt.creditsText,
        };
      }
    }
    delete opt.creditsHref;
    delete opt.creditsText;

    // disclaimer
    if (opt.disclaimer && !opt.footer?.disclaimer) {
      if (!opt.footer) {
        opt.footer = {};
      }
      if (!opt.footer.disclaimer) {
        opt.footer.disclaimer = opt.disclaimer;
      }
    }
    delete opt.disclaimer;

    // flags
    if (opt.flags && !opt.footer?.flags) {
      if (!opt.footer) {
        opt.footer = {};
      }
      if (!opt.footer.flags) {
        opt.footer.flags = opt.flags;
      }
    }
    delete opt.flags;

    // lastUpdated
    if (opt.lastUpdated && !opt.footer?.lastUpdated) {
      if (!opt.footer) {
        opt.footer = {};
      }
      if (!opt.footer.lastUpdated) {
        opt.footer.lastUpdated = opt.lastUpdated;
      }
    }
    delete opt.lastUpdated;

    // decimals
    if (opt.decimals && (!opt.units || opt.units?.length === 1)) {
      if (!opt.units) {
        opt.units = [{ label: undefined }];
      }
      if (!opt.units[0].decimals) {
        opt.units[0].decimals = opt.decimals;
      }
    }
    delete opt.decimals;

    this.diagramOptions = opt;
    // console.log('this.diagramOptions 2', this.diagramOptions);
  }
}
