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

  //
  // ----------------------------------------------------------
  // updateOptions() needs refactoring
  // AND "how to match series with yAxis?" must be resolved...
  // ----------------------------------------------------------
  //
  updateOptions_DEPRECATED(
    diagramOptions: FhiDiagramOptions,
    // metadataForSeries: MetadataForSerie[],
  ): Options {
    const options: Options = cloneDeep(this.allStaticOptions.get(diagramOptions.activeDiagramType));
    // const isPie = diagramOptions.activeDiagramType === DiagramTypeIdValues.pie;
    // const isMap = options?.chart && 'map' in options.chart;
    const series = diagramOptions.series;

    // options.series = this.getSeries(series, isMap);

    // 1. Generic
    // if (!diagramOptions.openSource) {
    //   options.credits = { enabled: false };
    // }

    // 4. Only spesific diagram types
    // if (isPie && options.legend && options.legend.title) {
    //   options.legend.title.text = options.series[0].name;
    // }

    // 3. Only chart
    // if (!isMap) {
    // options.tooltip = this.getTooltip_DEPRECATED(
    //   options.tooltip as TooltipOptions,
    //   diagramOptions,
    // );
    // options.xAxis = this.getXAxis(options.xAxis as XAxisOptions);

    if (diagramOptions.units?.length > 1 && diagramOptions.units?.length <= 2) {
      console.log('MORE THAN ONE Y-AXIS!');

      let serieIndex: number;

      options.yAxis = [];
      diagramOptions.units.forEach((unit, index) => {
        // options.yAxis[index] = this.getYAxis(unit);

        if (index === 1) {
          serieIndex = series.findIndex((serie) => serie.unitId === unit.id); // TODO: how to match series with yAxis?
          options.yAxis[index].opposite = true;
        }
      });

      // console.log('serieIndex', serieIndex);
      options.series[serieIndex].yAxis = 1; // TODO: how to match series with yAxis?
      options.series[serieIndex].type = 'line'; // TODO: how to match series with yAxis?
      // } else {
      //   const hasDecimalData = !!metadataForSeries.find((serie) => serie.hasDecimalData);
      //   const hasNegativeData = !!metadataForSeries.find((serie) => serie.hasNegativeData);

      //   options.yAxis = this.getYAxis_DEPRECATED(
      //     options.yAxis as YAxisOptions,
      //     diagramOptions,
      //     hasDecimalData,
      //     hasNegativeData,
      //   );
    }

    // 2. Only map
    // } else if (options.chart !== undefined) {
    //   options.chart.map = diagramOptions.activeDiagramType;
    // }

    // console.log('options', options);
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

  private updateGenericOptions(options: Options): Options {
    if (!this.diagramOptions.openSource) {
      options.credits = { enabled: false };
    }
    if (this.diagramOptions.units?.length === 1) {
      options.tooltip = this.getTooltip(
        options.tooltip as TooltipOptions,
        this.diagramOptions.units[0],
      );
    } else if (this.diagramOptions.units?.length === 2) {
      // TODO...
      // this.diagramOptions.units.forEach((unit) => {
      //   options.tooltip = this.getTooltip(options.tooltip as TooltipOptions);
      // });
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
    } else if (this.diagramOptions.units?.length === 2) {
      // TODO...
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

  // private getYAxis_DEPRECATED(
  //   yAxis: YAxisOptions,
  //   diagramOptions: FhiDiagramOptions,
  //   hasDecimalData: boolean,
  //   hasNegativeData: boolean,
  // ): YAxisOptions | YAxisOptions[] {
  //   yAxis = yAxis ? yAxis : {};

  //   if (hasDecimalData) {
  //     yAxis.allowDecimals = true;
  //     yAxis.min = undefined;
  //   }
  //   if (hasNegativeData) {
  //     yAxis.min = undefined;
  //   }
  //   if (diagramOptions.units?.length === 1) {
  //     yAxis.title.text = diagramOptions.units[0].label;
  //   }
  //   if (diagramOptions.units?.length === 1 && diagramOptions.units[0].symbol) {
  //     yAxis.labels = {
  //       format:
  //         diagramOptions.units[0].position === 'start'
  //           ? `${diagramOptions.units[0].symbol} {value}`
  //           : `{value} ${diagramOptions.units[0].symbol}`,
  //     };
  //   } else {
  //     yAxis.labels = {
  //       format: '{value}',
  //     };
  //   }
  //   return yAxis;
  // }

  // private getSeries(series: FhiDiagramSerie[], isMap: boolean | undefined): SeriesOptionsType[] {
  //   const highchartsSeries = cloneDeep(series);

  //   // Remove flagged data from Highcharts options series
  //   highchartsSeries.forEach((serie) => {
  //     serie.data = serie.data.filter((dataPoint) => typeof dataPoint.y !== 'string');
  //   });

  //   if (isMap) {
  //     return [this.topoJsonService.getHighmapsSerie(highchartsSeries[0])];
  //   }
  //   return highchartsSeries as SeriesOptionsType[];
  // }

  // private getXAxis(xAxis: XAxisOptions): XAxisOptions | XAxisOptions[] {
  //   xAxis = xAxis ? xAxis : {};
  //   return xAxis;
  // }

  // private getTooltip_DEPRECATED(
  //   tooltip: TooltipOptions,
  //   diagramOptions: FhiDiagramOptions,
  // ): TooltipOptions {
  //   tooltip = tooltip ? tooltip : {};
  //   if (diagramOptions.units?.length !== 1) {
  //     return tooltip;
  //   }
  //   if (diagramOptions.units[0].symbol) {
  //     if (diagramOptions.units[0].decimals) {
  //       tooltip.valueDecimals = diagramOptions.units[0].decimals;
  //     } else if (diagramOptions.decimals) {
  //       tooltip.valueDecimals = diagramOptions.decimals;
  //     }
  //     if (diagramOptions.units[0].position === 'start') {
  //       tooltip.valuePrefix = diagramOptions.units[0].symbol + ' ';
  //     } else {
  //       tooltip.valueSuffix = ' ' + diagramOptions.units[0].symbol;
  //     }
  //   } else {
  //     tooltip.valueDecimals = undefined;
  //     tooltip.valuePrefix = undefined;
  //     tooltip.valueSuffix = undefined;
  //   }
  //   return tooltip;
  // }

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
