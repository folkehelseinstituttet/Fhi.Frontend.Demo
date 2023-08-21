import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import cloneDeep from 'lodash-es/cloneDeep';
import merge from 'lodash-es/merge';
import { Options, SeriesOptionsType, XAxisLabelsOptions, XAxisOptions, YAxisOptions } from 'highcharts';
import { isValid, parseISO } from 'date-fns'

import { FhiAllDiagramTypes } from '../fhi-diagram-type.constants';
import { GeoJsonService } from './geo-json.service';
import { FhiAllDiagramOptions, FhiDiagramSerie } from '../fhi-diagram.models';
import { OptionsChartsAndMaps } from '../highcharts-options/options-charts-and-maps';
import { OptionsCharts } from '../highcharts-options/options-charts';
import { OptionsMaps } from '../highcharts-options/options-maps';

import { FhiDiagramTypeId } from '../fhi-diagram-type.constants';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  constructor(private geoJsonService: GeoJsonService) {
    this.setAllStaticOptions();
  }

  private allStaticOptions = new Map();

  updateOptions(allDiagramOptions: FhiAllDiagramOptions): Options {
    const isMap = allDiagramOptions?.diagramType?.isMap;
    const isDonutOrPie = allDiagramOptions.diagramTypeId === FhiDiagramTypeId.pie || allDiagramOptions.diagramTypeId === FhiDiagramTypeId.donut ? true : false;
    const options: Options = cloneDeep(this.allStaticOptions.get(allDiagramOptions.diagramTypeId));
    const series = allDiagramOptions.series;

    options.series = this.getSeries(series, isMap, allDiagramOptions?.allMapsLoaded);

    if (!allDiagramOptions.openSource) {
      options.credits = { enabled: false };
    }
    if (!isMap) {
      options.xAxis = this.getXAxis(options.xAxis as XAxisOptions, series);
      options.yAxis = this.getYAxis(options.yAxis as YAxisOptions, allDiagramOptions);
    }
    if (isDonutOrPie) {
      this.setPieAndDonutOptions(options);
    }
    return options;
  }

  private setAllStaticOptions() {
    FhiAllDiagramTypes.forEach(FhiDiagramType => {
      const optionsCurrentChartType = FhiDiagramType.options;
      const isMap = FhiDiagramType.isMap;
      const staticOptions = this.setStaticOptions(optionsCurrentChartType, isMap);
      this.allStaticOptions.set(FhiDiagramType.id, staticOptions);
    });
  }

  private setStaticOptions(optionsCurrentChartType: Options | undefined, isMap: boolean | undefined): Options {
    const chartsAndMaps = cloneDeep(OptionsChartsAndMaps);
    const current = (isMap) ? cloneDeep(OptionsMaps) : cloneDeep(OptionsCharts);
    return merge(chartsAndMaps, current, optionsCurrentChartType);
  }

  private getSeries(series: FhiDiagramSerie[], isMap: boolean | undefined, allMapsLoaded: boolean | undefined): SeriesOptionsType[] {
    if (isMap && allMapsLoaded) {

      // TODO: MAP
      return [this.geoJsonService.getHighmapsSerie(series[0])];

    } else {
      const highchartsSeries = cloneDeep(series);
      highchartsSeries.forEach((serie) => {
        // Remove flagged data from Highcharts options series
        serie.data = serie.data.filter(dataPoint =>  typeof dataPoint.y !== 'string')
      });
      return highchartsSeries as SeriesOptionsType[];
    }
  }

  private getXAxis(xAxis: XAxisOptions, series: FhiDiagramSerie[]): XAxisOptions | XAxisOptions[] {
    xAxis = (xAxis) ? xAxis : {};
    xAxis.labels = this.getFormattedLabels(series);
    return xAxis;
  }

  private getYAxis(yAxis: YAxisOptions, allDiagramOptions: FhiAllDiagramOptions): YAxisOptions | YAxisOptions[] {
    yAxis = (yAxis) ? yAxis : {};
    if (allDiagramOptions.seriesHasDecimalDataPoints) {
      yAxis.allowDecimals = true;
      yAxis.min = undefined;
    }
    if (allDiagramOptions.seriesHasNegativeDataPoints) {
      yAxis.min = undefined;
    }
    return yAxis;
  }

  private getFormattedLabels(series: FhiDiagramSerie[]): XAxisLabelsOptions {
    const isDayLabels = isValid(parseISO(this.getISO8601DataFromNorwegianDate(series[0].data[0].name)));
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
      }
    };
  }

  private formatDayLabelsAsDaySlashMonth(): XAxisLabelsOptions {
    return {
      formatter: (that: Highcharts.AxisLabelsFormatterContextObject) => {
        const value: string = that.value.toString();
        return formatDate(this.getISO8601DataFromNorwegianDate(value), 'd/M', 'nb-NO');
      }
    };
  }

  private setPieAndDonutOptions(options: any) {
    options.legend = {
      align: 'left',
      itemMarginBottom: 3,
      itemMarginTop: 3,
      layout: 'vertical',
      title: {
        text: options.series[0].name,
      },
      verticalAlign: 'top',
    };
    options.responsive = {
      rules: [
        {
          chartOptions: {
            legend: {
              align: 'center',
              margin: 0,
              maxHeight: 120,
            },
          },
          condition: {
            maxWidth: 400,
          },
        },
      ],
    };
  }

  public getISO8601DataFromNorwegianDate(nbNODate: string) {
    const dateList = nbNODate.split('.');
    return `${dateList[2]}-${dateList[1]}-${dateList[0]}`;
  }

}

