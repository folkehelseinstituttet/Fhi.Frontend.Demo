import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import cloneDeep from 'lodash-es/cloneDeep';
import merge from 'lodash-es/merge';
import { CaptionOptions, CreditsOptions, Options, SeriesOptionsType, TitleOptions, XAxisLabelsOptions, XAxisOptions } from 'highcharts';
import { isValid, parseISO } from 'date-fns'

import { DiagramType } from '../diagram-types/fhi-diagram-type.model';
import { DiagramTypeList } from '../diagram-types/fhi-diagram-types';
import { FhiHighchartsGeoJsonService } from './fhi-highcharts-geo-json.service';
import { DiagramOptions, DiagramSerie } from '../diagram-options.model';
import { OptionsChartsAndMaps } from '../highcharts-options/options-charts-and-maps';
import { OptionsCharts } from '../highcharts-options/options-charts';
import { OptionsMaps } from '../highcharts-options/options-maps';

@Injectable({
  providedIn: 'root'
})
export class FhiHighchartsOptionsService {

  constructor(private geoJsonService: FhiHighchartsGeoJsonService) {
    this.diagramTypeList = DiagramTypeList;
    this.setAllStaticOptions();
  }

  private allStaticOptions = new Map();
  private diagramTypeList: DiagramType[];

  updateOptions(diagramOptions: DiagramOptions, allMapsLoaded: boolean): Options {
    const options: Options = cloneDeep(this.allStaticOptions.get(diagramOptions.diagramType.id));

    options.title = { text: diagramOptions.title, align: 'left' } as TitleOptions;
    options.series = this.getSeries(diagramOptions.data, diagramOptions.diagramType.isMap, allMapsLoaded);

    if (!diagramOptions.openSource) {
      options.caption = this.getCaptionText(options.caption, diagramOptions.lastUpdated, diagramOptions.disclaimer);
      options.credits = this.getCredits(options.credits, diagramOptions.creditsHref, diagramOptions.creditsText, diagramOptions.diagramType.isMap);
    }
    if (!diagramOptions.diagramType.isMap) {
      options.xAxis = this.getXaxis(options.xAxis as XAxisOptions, diagramOptions.data);
    }
    return options;
  }

  private setAllStaticOptions() {
    this.diagramTypeList.forEach(DiagramType => {
      const optionsCurrentChartType = DiagramType.options;
      const isMap = DiagramType.isMap;
      const staticOptions = this.setStaticOptions(optionsCurrentChartType, isMap);
      this.allStaticOptions.set(DiagramType.id, staticOptions);
    });
  }

  private setStaticOptions(optionsCurrentChartType: Options, isMap: boolean | undefined): Options {
    const chartsAndMaps = cloneDeep(OptionsChartsAndMaps);
    const current = (isMap) ? cloneDeep(OptionsMaps) : cloneDeep(OptionsCharts);
    return merge(chartsAndMaps, current, optionsCurrentChartType);
  }

  private getCaptionText(caption: CaptionOptions | undefined, lastUpdated: string, disclaimerHtml: string | undefined) {
    const disclaimer = (disclaimerHtml === undefined) ? false : true;
    const lastUpdatedHtml = `<p>Oppdatert: ${lastUpdated}</p>`;
    caption = (caption) ? caption : {};
    caption.text = lastUpdatedHtml + ((disclaimer) ? disclaimerHtml : '');
    if (!disclaimer) {
      caption.y = 32;
    }
    return caption;
  }

  private getCredits(credits: CreditsOptions | undefined, href: string, text: string, isMap: boolean | undefined) {
    credits = (credits) ? credits : {};
    if (isMap) {
      credits.text = '<a href="' + href + '">' + text + '</a>';
    } else {
      credits.href = href;
      credits.text = text;
    }
    return credits;
  }

  private getSeries(series: DiagramSerie[], isMap: boolean | undefined, allMapsLoaded: boolean): SeriesOptionsType[] {
    if (isMap && allMapsLoaded) {
      return [this.geoJsonService.getHighmapsSerie(series[0])];
    } else {
      return series as SeriesOptionsType[];
    }
  }

  private getXaxis(xAxis: XAxisOptions, series: DiagramSerie[]): XAxisOptions | XAxisOptions[] {
    xAxis = (xAxis) ? xAxis : {};
    xAxis.labels = this.getFormattedLabels(series);
    return xAxis;
  }

  private getFormattedLabels(series: DiagramSerie[]): XAxisLabelsOptions {
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

  // TODO: move to generic date-service
  public getISO8601DataFromNorwegianDate(nbNODate: string) {
    const dateList = nbNODate.split('.');
    return `${dateList[2]}-${dateList[1]}-${dateList[0]}`;
  }

}

