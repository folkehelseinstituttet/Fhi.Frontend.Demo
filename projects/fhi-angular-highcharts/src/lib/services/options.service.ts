import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import cloneDeep from 'lodash-es/cloneDeep';
import merge from 'lodash-es/merge';
import { Options, SeriesOptionsType, XAxisLabelsOptions, XAxisOptions } from 'highcharts';
import { isValid, parseISO } from 'date-fns'

import { FhiAllDiagramTypes } from '../fhi-diagram/fhi-diagram-type.constants';
// import { GeoJsonService } from './geo-json.service';
import { FhiDiagramOptions, FhiDiagramSerie } from '../fhi-diagram/fhi-diagram.models';
import { OptionsChartsAndMaps } from '../highcharts-options/options-charts-and-maps';
import { OptionsCharts } from '../highcharts-options/options-charts';
import { OptionsMaps } from '../highcharts-options/options-maps';
import { FhiDiagramType } from '../fhi-diagram/fhi-diagram.models'

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  // constructor(private geoJsonService: GeoJsonService) {
  constructor() {
    this.setAllStaticOptions();
  }

  private allStaticOptions = new Map();

  updateOptions(diagramOptions: FhiDiagramOptions, diagramType: FhiDiagramType, allMapsLoaded: boolean): Options {
    const options: Options = cloneDeep(this.allStaticOptions.get(diagramOptions.diagramTypeId));
    options.series = this.getSeries(diagramOptions.series, diagramType.isMap, allMapsLoaded);

    if (!diagramOptions.openSource) {
      options.credits = { enabled: false };
    }
    if (!diagramType.isMap) {
      options.xAxis = this.getXaxis(options.xAxis as XAxisOptions, diagramOptions.series);
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

  private setStaticOptions(optionsCurrentChartType: Options, isMap: boolean | undefined): Options {
    const chartsAndMaps = cloneDeep(OptionsChartsAndMaps);
    const current = (isMap) ? cloneDeep(OptionsMaps) : cloneDeep(OptionsCharts);
    return merge(chartsAndMaps, current, optionsCurrentChartType);
  }

  private getSeries(data: FhiDiagramSerie[], isMap: boolean | undefined, allMapsLoaded: boolean): SeriesOptionsType[] {
    if (isMap && allMapsLoaded) {
      // TODO: MAP
      // return [this.geoJsonService.getHighmapsSerie(series[0])];

    } else {
      const highchartsSeries = cloneDeep(data);
      highchartsSeries.forEach((serie) => {
        // Remove flagged data from Highcharts options series
        serie.data = serie.data.filter(dataPoint =>  typeof dataPoint.y !== 'string')
      });
      return highchartsSeries as SeriesOptionsType[];
    }
  }

  private getXaxis(xAxis: XAxisOptions, series: FhiDiagramSerie[]): XAxisOptions | XAxisOptions[] {
    xAxis = (xAxis) ? xAxis : {};
    xAxis.labels = this.getFormattedLabels(series);
    return xAxis;
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

  public getISO8601DataFromNorwegianDate(nbNODate: string) {
    const dateList = nbNODate.split('.');
    return `${dateList[2]}-${dateList[1]}-${dateList[0]}`;
  }

}

