import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import cloneDeep from 'lodash-es/cloneDeep';
import merge from 'lodash-es/merge';
import { isValid, parseISO } from 'date-fns';
import {
  Options,
  SeriesOptionsType,
  TooltipOptions,
  XAxisLabelsOptions,
  XAxisOptions,
  YAxisOptions,
} from 'highcharts';

import { FhiDiagramSerie } from '../models/fhi-diagram-serie.model';
import { FhiDiagramOptions } from '../models/fhi-diagram-options.model';
import { MetadataForSerie } from '../models/metadata-for-serie.model';

import { AllDiagramTypes } from '../constants-and-enums/fhi-diagram-types';
import { DiagramTypeIdValues } from '../constants-and-enums/diagram-type-ids';

import { TopoJsonService } from './topo-json.service';
import { OptionsChartsAndMaps } from '../highcharts-options/options-charts-and-maps';
import { OptionsCharts } from '../highcharts-options/options-charts';
import { OptionsMaps } from '../highcharts-options/options-maps';
import { FhiDiagramUnit } from '../models/fhi-diagram-unit.model';

@Injectable()
export class OptionsService {
  private allStaticOptions = new Map();
  private diagramOptions: FhiDiagramOptions;
  private metadataForSeries: MetadataForSerie[];

  constructor(private topoJsonService: TopoJsonService) {
    this.setAllStaticOptions();
  }

  updateOptions(diagramOptions: FhiDiagramOptions, metadataForSeries: MetadataForSerie[]): Options {
    let options: Options = cloneDeep(this.allStaticOptions.get(diagramOptions.activeDiagramType));
    const isMap = options.chart && 'map' in options.chart;
    this.diagramOptions = diagramOptions;
    this.metadataForSeries = metadataForSeries;

    options = this.updateGenericOptions(options);
    options = isMap ? this.updateMapOptions(options) : this.updateChartOptions(options);
    return this.updateOptionsForCurrentDiagramType(options);
  }

  private setAllStaticOptions() {
    AllDiagramTypes.forEach((FhiDiagramType) => {
      const options = FhiDiagramType.options;
      const isMap = options?.chart && 'map' in options.chart;
      const staticOptions = this.setStaticOptions(options, isMap);
      this.allStaticOptions.set(FhiDiagramType.id, staticOptions);
    });
  }

  private setStaticOptions(options: Options | undefined, isMap: boolean | undefined): Options {
    const chartsAndMaps = cloneDeep(OptionsChartsAndMaps);
    const current = isMap ? cloneDeep(OptionsMaps) : cloneDeep(OptionsCharts);
    return merge(chartsAndMaps, current, options);
  }

  private updateGenericOptions(options: Options): Options {
    if (!this.diagramOptions.openSource) {
      options.credits = { enabled: false };
    }
    if (this.diagramOptions.units?.length === 1) {
      options.tooltip = this.getTooltip(
        options.tooltip as TooltipOptions,
        this.diagramOptions.units[0],
      );
    }
    return options;
  }

  private updateMapOptions(options: Options): Options {
    const hasNegativeData = !!this.metadataForSeries.find((serie) => serie.hasNegativeData);
    const hasPositiveData = !!this.metadataForSeries.find((serie) => serie.hasPositiveData);
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
    if (hasNegativeData && hasPositiveData) {
      options.colorAxis = { ...colorAxis, stops: stopsNegativeAndPositive };
    } else if (hasNegativeData) {
      options.colorAxis = { ...colorAxis, stops: stopsNegative };
    } else {
      options.colorAxis = { ...colorAxis, stops: stopsPositive };
    }
    options.chart.map = this.diagramOptions.activeDiagramType;
    options.series = [
      this.topoJsonService.getHighmapsSerie(this.getSeriesWithoutFlaggedDataPoints()[0]),
    ];
    return options;
  }

  private updateChartOptions(options: Options): Options {
    options.series = this.getSeriesWithoutFlaggedDataPoints() as SeriesOptionsType[];
    options.xAxis = this.getXAxis(options.xAxis as XAxisOptions, this.diagramOptions);

    if (this.diagramOptions.units?.length === 1) {
      options.yAxis = this.getYAxis(options.yAxis as YAxisOptions, this.diagramOptions.units[0]);
    } else {
      options.yAxis = this.getYAxis(options.yAxis as YAxisOptions);
    }
    return options;
  }

  private updateOptionsForCurrentDiagramType(options: Options): Options {
    switch (this.diagramOptions.activeDiagramType) {
      case DiagramTypeIdValues.line:
        options.series = this.setStringToNull(this.diagramOptions.series);
        break;

      case DiagramTypeIdValues.pie:
        if (options.legend && options.legend.title) {
          options.legend.title.text = options.series[0].name;
        }
        break;

      case DiagramTypeIdValues.columnAndLine:
        if (this.diagramOptions.units?.length === 2) {
          this.updateOptionsForDiagramTypeColumnAndLine(options);
        }
        break;
    }
    return options;
  }

  private setStringToNull(series: FhiDiagramSerie[]): SeriesOptionsType[] {
    const newSeries = cloneDeep(series);
    newSeries.forEach((serie) => {
      serie.data.forEach((dataPoint) => {
        if (typeof dataPoint.y === 'string') {
          dataPoint.y = null;
        }
      });
    });
    return newSeries as SeriesOptionsType[];
  }

  private getSeriesWithoutFlaggedDataPoints() {
    const seriesWithoutFlags = cloneDeep(this.diagramOptions.series);
    seriesWithoutFlags.forEach((serie) => {
      serie.data = serie.data.filter((dataPoint) => typeof dataPoint.y !== 'string');
    });
    return seriesWithoutFlags;
  }

  private getTooltip(tooltip: TooltipOptions, unit: FhiDiagramUnit): TooltipOptions {
    tooltip = tooltip ? tooltip : {};

    if (unit.decimals !== undefined) {
      tooltip.formatter = function (tooltip) {
        // console.log('this', this);
        // console.log('this.point', this.point);

        if (this.point.y === 12.15) {
          this.point.series['tooltipOptions'].valueDecimals = 2;
        } else {
          this.point.series['tooltipOptions'].valueDecimals = 3;
        }
        return tooltip.defaultFormatter.call(this, tooltip);
      };
    }

    if (unit.symbol) {
      if (unit.position === 'start') {
        tooltip.valuePrefix = unit.symbol + ' ';
      } else {
        tooltip.valueSuffix = ' ' + unit.symbol;
      }
    }
    return tooltip;
  }
  // TODO: utilService?
  private decimalCount(value: number | string): number {
    if (typeof value !== 'number') return 0;
    if (Math.floor(value) === value) return 0;
    return value.toString().split('.')[1].length || 0;
  }

  private getXAxis(xAxis: XAxisOptions, diagramOptions: FhiDiagramOptions): XAxisOptions {
    xAxis = xAxis ? xAxis : {};
    xAxis.title.text = diagramOptions.categoryAxis?.title;
    return xAxis;
  }

  private getYAxis(yAxis: YAxisOptions, unit?: FhiDiagramUnit): YAxisOptions {
    const hasDecimalData = !!this.metadataForSeries.find((serie) => serie.hasDecimalData);
    const hasNegativeData = !!this.metadataForSeries.find((serie) => serie.hasNegativeData);
    yAxis = yAxis ? yAxis : {};

    if (hasDecimalData) {
      yAxis.allowDecimals = true;
    }
    if (hasNegativeData) {
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

  private updateOptionsForDiagramTypeColumnAndLine(options: Options) {
    const units = this.diagramOptions.units;
    this.diagramOptions.series.forEach((serie, i) => {
      if (units[0].id === serie.unitId) {
        options.series[i] = {
          ...options.series[i],
          tooltip: this.getTooltip({}, units[0]),
          yAxis: 0,
          type: 'column',
          zIndex: 0,
        } as SeriesOptionsType;
      } else if (units[1].id === serie.unitId) {
        options.series[i] = {
          ...options.series[i],
          tooltip: this.getTooltip({}, units[1]),
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
