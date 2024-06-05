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
    options.chart.map = this.diagramOptions.activeDiagramType;
    options.series = [
      this.topoJsonService.getHighmapsSerie(this.getSeriesWithoutFlaggedDataPoints()[0]),
    ];
    return options;
  }

  private updateChartOptions(options: Options): Options {
    options.series = this.getSeriesWithoutFlaggedDataPoints() as SeriesOptionsType[];
    if (this.diagramOptions.units?.length === 1) {
      options.yAxis = this.getYAxis(options.yAxis as YAxisOptions, this.diagramOptions.units[0]);
    } else {
      options.yAxis = this.getYAxis(options.yAxis as YAxisOptions);
    }
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
          this.updateOptionsForDiagramTypeColumnAndLine(options);
        }
        break;
    }
    return options;
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

    if (unit.decimals) {
      tooltip.valueDecimals = unit.decimals;
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
    }
    return yAxis;
  }

  private updateOptionsForDiagramTypeColumnAndLine(options: Options) {
    this.diagramOptions.series.forEach((serie, i) => {
      if (serie.unitId === this.diagramOptions.units[0].id) {
        options.series[i]['tooltip'] = this.getTooltip({}, this.diagramOptions.units[0]);
        options.series[i].type = 'column';
        options.series[i].yAxis = 0;
      } else if (serie.unitId === this.diagramOptions.units[1].id) {
        options.series[i]['tooltip'] = this.getTooltip({}, this.diagramOptions.units[1]);
        options.series[i].type = 'line';
        options.series[i].yAxis = 1;
      }
    });
    options.yAxis = this.getTwoYAxis(options.yAxis as YAxisOptions[], this.diagramOptions.units);
  }

  private getTwoYAxis(yAxis: YAxisOptions[], units: FhiDiagramUnit[]): YAxisOptions[] {
    yAxis = [];
    yAxis[0] = this.getYAxis({}, units[0]);
    yAxis[1] = this.getYAxis({}, units[1]);
    yAxis[1].opposite = true;
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
