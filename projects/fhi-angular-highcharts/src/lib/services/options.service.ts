import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import cloneDeep from 'lodash-es/cloneDeep';
import merge from 'lodash-es/merge';
import { isValid, parseISO } from 'date-fns';
import {
  Options,
  SeriesOptionsType,
  TooltipFormatterCallbackFunction,
  TooltipOptions,
  XAxisLabelsOptions,
  XAxisOptions,
  YAxisOptions,
} from 'highcharts';

import { FhiDiagramSerie } from '../models/fhi-diagram-serie.model';
import { FhiDiagramOptions } from '../models/fhi-diagram-options.model';

import { AllDiagramTypes } from '../constants-and-enums/fhi-diagram-types';
import { DiagramTypeIdValues } from '../constants-and-enums/diagram-type-ids';

import { TopoJsonService } from './topo-json.service';
import { OptionsChartsAndMaps } from '../highcharts-options/options-charts-and-maps';
import { OptionsCharts } from '../highcharts-options/options-charts';
import { OptionsMaps } from '../highcharts-options/options-maps';
import { FhiDiagramUnit } from '../models/fhi-diagram-unit.model';
import { FhiDiagramSerieData } from '../models/fhi-diagram-serie-data.model';
import { MetadataForSeriesService } from './metadata-for-series.service';

@Injectable()
export class OptionsService {
  private allStaticOptions = new Map();
  private diagramOptions: FhiDiagramOptions;
  private isMap: boolean;

  constructor(
    private topoJsonService: TopoJsonService,
    private metadataForSeriesService: MetadataForSeriesService,
  ) {
    this.setAllStaticOptions();
  }

  updateOptions(diagramOptions: FhiDiagramOptions): Options {
    let options: Options = cloneDeep(this.allStaticOptions.get(diagramOptions.activeDiagramType));
    this.diagramOptions = diagramOptions;
    this.isMap = this.getIsMap(options);

    options = this.updateChartAndMapOptions(options);
    options = this.isMap ? this.updateMapOptions(options) : this.updateChartOptions(options);
    return this.updateOptionsForCurrentDiagramType(options);
  }

  private getIsMap(options: Options | undefined): boolean {
    return !!(options?.chart && 'map' in options.chart);
  }

  private setAllStaticOptions() {
    AllDiagramTypes.forEach((FhiDiagramType) => {
      const options = FhiDiagramType.options;
      const staticOptions = this.setStaticOptions(options);
      this.allStaticOptions.set(FhiDiagramType.id, staticOptions);
    });
  }

  private setStaticOptions(options: Options | undefined): Options {
    const chartsAndMaps = cloneDeep(OptionsChartsAndMaps);
    const current = this.getIsMap(options) ? cloneDeep(OptionsMaps) : cloneDeep(OptionsCharts);
    return merge(chartsAndMaps, current, options);
  }

  private updateChartAndMapOptions(options: Options): Options {
    this.diagramOptions.series.forEach((serie, i) => {
      options.series[i] = {
        name: serie.name,
        data: this.updateSerieData(serie.data),
      } as SeriesOptionsType;
    });

    if (!this.diagramOptions.openSource) {
      options.credits = { enabled: false };
    }

    options.tooltip = {
      formatter: this.getTooltipFormatterCallbackFunction(),
    } as TooltipOptions;

    return options;
  }

  private updateSerieData(data: FhiDiagramSerieData[]): FhiDiagramSerieData[] {
    if (this.diagramOptions.activeDiagramType === DiagramTypeIdValues.line) {
      return this.getDataWithoutStringDataPoints(data);
    }
    return this.getDataWithoutFlaggedDataPoints(data);
  }

  private getDataWithoutStringDataPoints(data: FhiDiagramSerieData[]): FhiDiagramSerieData[] {
    const dataWithoutStrings = cloneDeep(data);
    dataWithoutStrings.forEach((dataPoint) => {
      if (typeof dataPoint.y === 'string') {
        dataPoint.y = null;
      }
    });
    return dataWithoutStrings;
  }

  private getDataWithoutFlaggedDataPoints(data: FhiDiagramSerieData[]): FhiDiagramSerieData[] {
    return cloneDeep(data).filter((dataPoint) => typeof dataPoint.y !== 'string');
  }

  private updateChartOptions(options: Options): Options {
    options.xAxis = this.getXAxis(options.xAxis as XAxisOptions, this.diagramOptions);

    if (this.diagramOptions.units?.length === 1) {
      options.yAxis = this.getYAxis(options.yAxis as YAxisOptions, this.diagramOptions.units[0]);
    } else {
      options.yAxis = this.getYAxis(options.yAxis as YAxisOptions);
    }

    return options;
  }

  private updateMapOptions(options: Options): Options {
    const colorAxis = options.colorAxis;
    const stopsPositive: Array<[number, string]> = [
      [0, '#ffffff'],
      [0.17, '#c8e1ec'], // B2-90
      [0.33, '#8fc5dc'], // B2-80
      [0.5, '#65a9c5'], // B2-70
      [0.67, '#4089a7'], // B2-60
      [0.83, '#2a6a82'], // B2-50
      [1, '#234e5f'], // B2-40
    ];
    const stopsNegative: Array<[number, string]> = [
      [0, '#7b2623'], // R1-40
      [0.17, '#a93c38'], // R1-50
      [0.33, '#d74b46'], // R1-60
      [0.5, '#ec7c73'], // R1-70
      [0.67, '#fda49b'], // R1-80
      [0.83, '#ffd2cc'], // R1-90
      [1, '#ffffff'],
    ];
    const stopsNegativeAndPositive: Array<[number, string]> = [
      [0, '#7b2623'], // R1-40
      [0.08, '#a93c38'], // R1-50
      [0.17, '#d74b46'], // R1-60
      [0.25, '#ec7c73'], // R1-70
      [0.33, '#fda49b'], // R1-80
      [0.42, '#ffd2cc'], // R1-90
      [0.5, '#ffffff'],
      [0.58, '#c8e1ec'], // B2-90
      [0.67, '#8fc5dc'], // B2-80
      [0.75, '#65a9c5'], // B2-70
      [0.83, '#4089a7'], // B2-60
      [0.92, '#2a6a82'], // B2-50
      [1, '#234e5f'], // B2-40
    ];
    if (
      this.metadataForSeriesService.getHasNegativeData() &&
      this.metadataForSeriesService.getHasPositiveData()
    ) {
      options.colorAxis = { ...colorAxis, stops: stopsNegativeAndPositive };
    } else if (this.metadataForSeriesService.getHasNegativeData()) {
      options.colorAxis = { ...colorAxis, stops: stopsNegative };
    } else {
      options.colorAxis = { ...colorAxis, stops: stopsPositive };
    }
    options.chart.map = this.diagramOptions.activeDiagramType;

    options.series = [this.topoJsonService.getHighmapsSerie(options.series[0] as FhiDiagramSerie)];
    return options;
  }

  private updateOptionsForCurrentDiagramType(options: Options): Options {
    switch (this.diagramOptions.activeDiagramType) {
      case DiagramTypeIdValues.pie:
        if (options.legend && options.legend.title) {
          options.legend.title.text = options.series[0].name;
        }
        break;

      case DiagramTypeIdValues.columnAndLine:
        if (this.diagramOptions.units?.length === 2) {
          options = this.updateOptionsForDiagramTypeColumnAndLine(options);
        }
        break;
    }
    return options;
  }

  private updateOptionsForDiagramTypeColumnAndLine(options: Options): Options {
    const units = this.diagramOptions.units;
    this.diagramOptions.series.forEach((serie, i) => {
      if (units[0].id === serie.unitId) {
        options.series[i] = {
          ...options.series[i],
          tooltip: this.getTooltip(units[0]),
          yAxis: 0,
          type: 'column',
          zIndex: 0,
        } as SeriesOptionsType;
      } else if (units[1].id === serie.unitId) {
        options.series[i] = {
          ...options.series[i],
          tooltip: this.getTooltip(units[1]),
          yAxis: 1,
          type: 'line',
          zIndex: 1,
        } as SeriesOptionsType;
      }
    });
    options.yAxis = [
      this.getYAxis({}, units[0]),
      {
        ...this.getYAxis({}, units[1]),
        opposite: true,
      },
    ];
    return options;
  }

  private getTooltipFormatterCallbackFunction(): TooltipFormatterCallbackFunction {
    const service = this.metadataForSeriesService;
    const isMap = this.isMap;

    return function (tooltip) {
      const value = isMap ? this.point.value : this.point.y;
      const maxDecimals = service.getMaxDecimals(this.series.name);
      const isDecimalNumber = service.getIsDecimalNumber(value);
      const decimalCount = service.getDecimalCount(value);
      let valueDecimals: number;

      // console.log('this', this);

      // console.log('isMap', isMap);
      // console.log('maxDecimals', maxDecimals);
      // console.log('isDecimalNumber', isDecimalNumber);
      // console.log('decimalCount', decimalCount);

      if (isDecimalNumber && decimalCount > maxDecimals) {
        valueDecimals = maxDecimals;
      } else {
        valueDecimals = decimalCount;
      }

      // console.log('valueDecimals', valueDecimals);

      this.point.series['tooltipOptions'].valueDecimals = valueDecimals;
      return tooltip.defaultFormatter.call(this, tooltip);
    };
  }

  private getTooltip(unit: FhiDiagramUnit): TooltipOptions {
    const tooltip: TooltipOptions = {};

    if (unit.symbol) {
      if (unit.position === 'start') {
        tooltip.valuePrefix = unit.symbol + ' ';
      } else {
        tooltip.valueSuffix = ' ' + unit.symbol;
      }
    }
    return tooltip;
  }

  private getXAxis(xAxis: XAxisOptions, diagramOptions: FhiDiagramOptions): XAxisOptions {
    xAxis = xAxis ? xAxis : {};
    xAxis.title.text = diagramOptions.categoryAxis?.title;
    return xAxis;
  }

  private getYAxis(yAxis: YAxisOptions, unit?: FhiDiagramUnit): YAxisOptions {
    yAxis = yAxis ? yAxis : {};

    if (this.metadataForSeriesService.getHasDecimalData()) {
      yAxis.allowDecimals = true;
    }
    if (this.metadataForSeriesService.getHasNegativeData()) {
      yAxis.min = undefined;
    }

    if (unit !== undefined) {
      yAxis.title = {
        text: unit.label,
      };
      if (unit.symbol && unit.position) {
        yAxis.labels = {
          format: unit.position === 'start' ? `${unit.symbol} {value}` : `{value} ${unit.symbol}`,
        };
      } else {
        yAxis.labels = {
          format: '{value}',
        };
      }
      if (unit.yAxisMax !== undefined) {
        yAxis.max = unit.yAxisMax;
      }
      if (unit.yAxisMin !== undefined) {
        yAxis.min = unit.yAxisMin;
      }
    }
    return yAxis;
  }

  /**
   * The following date formatting methods are currently not in use,
   * but they are kept around since they probably will be reintroduced.
   */

  private getFormattedLabels(series: FhiDiagramSerie[]): XAxisLabelsOptions {
    const isDayLabels = isValid(
      parseISO(this.getISO8601DataFromNorwegianDate(series[0].data[0].name)),
    );
    if (isDayLabels) {
      if (series[0].data.length > 60) {
        return this.formatDayLabelsForFirstDayInMonthsAsLLL();
      } else {
        return this.formatDayLabelsAsDaySlashMonth();
      }
    }
    return {};
  }

  private formatDayLabelsForFirstDayInMonthsAsLLL(): XAxisLabelsOptions {
    return {
      step: 1,
      formatter: (that: Highcharts.AxisLabelsFormatterContextObject) => {
        const value: string = that.value.toString();
        if (value.substring(0, 2) === '01') {
          return formatDate(this.getISO8601DataFromNorwegianDate(value), 'LLL', 'nb-NO');
        } else {
          return value;
        }
      },
    };
  }

  private formatDayLabelsAsDaySlashMonth(): XAxisLabelsOptions {
    return {
      formatter: (that: Highcharts.AxisLabelsFormatterContextObject) => {
        const value: string = that.value.toString();
        return formatDate(this.getISO8601DataFromNorwegianDate(value), 'd/M', 'nb-NO');
      },
    };
  }

  private getISO8601DataFromNorwegianDate(nbNODate: string) {
    const dateList = nbNODate.split('.');
    return `${dateList[2]}-${dateList[1]}-${dateList[0]}`;
  }
}
