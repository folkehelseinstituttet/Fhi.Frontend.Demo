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

import { AllDiagramTypes } from '../constants-and-enums/fhi-diagram-types';
import { DiagramTypeIdValues as DiagramTypeIds } from '../constants-and-enums/diagram-type-ids';
import { AllDiagramOptions } from '../models/all-diagram-options.model';
import { SeriesInfo } from '../models/series-info.model';

import { TopoJsonService } from './topo-json.service';
import { OptionsChartsAndMaps } from '../highcharts-options/options-charts-and-maps';
import { OptionsCharts } from '../highcharts-options/options-charts';
import { OptionsMaps } from '../highcharts-options/options-maps';

@Injectable()
export class OptionsService {
  private allStaticOptions = new Map();

  constructor(private topoJsonService: TopoJsonService) {
    this.setAllStaticOptions();
  }

  updateOptions(allDiagramOptions: AllDiagramOptions, seriesInfo: SeriesInfo): Options {
    const options: Options = cloneDeep(
      this.allStaticOptions.get(allDiagramOptions.activeDiagramType),
    );
    const isPie = allDiagramOptions.activeDiagramType === DiagramTypeIds.pie;
    const isMap = options?.chart && 'map' in options.chart;
    const series = allDiagramOptions.series;

    options.series = this.getSeries(series, isMap);

    if (!allDiagramOptions.openSource) {
      options.credits = { enabled: false };
    }
    if (isPie && options.legend && options.legend.title) {
      options.legend.title.text = options.series[0].name;
    }
    if (!isMap) {
      options.xAxis = this.getXAxis(options.xAxis as XAxisOptions);
      options.yAxis = this.getYAxis(options.yAxis as YAxisOptions, allDiagramOptions, seriesInfo);
      options.tooltip = this.getTooltip(options.tooltip as TooltipOptions, allDiagramOptions);
    } else if (options.chart !== undefined) {
      options.chart.map = allDiagramOptions.activeDiagramType;
    }
    return options;
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

  private getSeries(series: FhiDiagramSerie[], isMap: boolean | undefined): SeriesOptionsType[] {
    const highchartsSeries = cloneDeep(series);

    // Remove flagged data from Highcharts options series
    highchartsSeries.forEach((serie) => {
      serie.data = serie.data.filter((dataPoint) => typeof dataPoint.y !== 'string');
    });

    if (isMap) {
      return [this.topoJsonService.getHighmapsSerie(highchartsSeries[0])];
    } else {
      return highchartsSeries as SeriesOptionsType[];
    }
  }

  private getXAxis(xAxis: XAxisOptions): XAxisOptions | XAxisOptions[] {
    xAxis = xAxis ? xAxis : {};
    return xAxis;
  }

  private getYAxis(
    yAxis: YAxisOptions,
    allDiagramOptions: AllDiagramOptions,
    seriesInfo: SeriesInfo,
  ): YAxisOptions | YAxisOptions[] {
    yAxis = yAxis ? yAxis : {};
    if (seriesInfo.decimalDataPointsExists) {
      yAxis.allowDecimals = true;
      yAxis.min = undefined;
    }
    if (allDiagramOptions.seriesHasNegativeDataPoints) {
      yAxis.min = undefined;
    }
    if (allDiagramOptions.unit?.length === 1) {
      yAxis.title.text = allDiagramOptions.unit[0].label;
    }
    if (allDiagramOptions.unit?.length === 1 && allDiagramOptions.unit[0].symbol) {
      yAxis.labels = {
        format:
          allDiagramOptions.unit[0].position === 'start'
            ? `${allDiagramOptions.unit[0].symbol} {value}`
            : `{value} ${allDiagramOptions.unit[0].symbol}`,
      };
    } else {
      yAxis.labels = {
        format: '{value}',
      };
    }
    return yAxis;
  }

  private getTooltip(
    tooltip: TooltipOptions,
    allDiagramOptions: AllDiagramOptions,
  ): TooltipOptions {
    tooltip = tooltip ? tooltip : {};
    if (allDiagramOptions.unit?.length !== 1) {
      return tooltip;
    }
    if (allDiagramOptions.unit[0].symbol) {
      if (allDiagramOptions.unit[0].decimals) {
        tooltip.valueDecimals = allDiagramOptions.unit[0].decimals;
      } else if (allDiagramOptions.decimals) {
        tooltip.valueDecimals = allDiagramOptions.decimals;
      }
      if (allDiagramOptions.unit[0].position === 'start') {
        tooltip.valuePrefix = allDiagramOptions.unit[0].symbol + ' ';
      } else {
        tooltip.valueSuffix = ' ' + allDiagramOptions.unit[0].symbol;
      }
    } else {
      tooltip.valueDecimals = undefined;
      tooltip.valuePrefix = undefined;
      tooltip.valueSuffix = undefined;
    }
    return tooltip;
  }

  /*
  The methods below is for date formatting, that is abandoned.
  Keep for possibility that this will be reintroduced.
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
