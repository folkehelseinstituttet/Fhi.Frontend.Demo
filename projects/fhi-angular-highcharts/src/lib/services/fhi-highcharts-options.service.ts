import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import cloneDeep from 'lodash-es/cloneDeep';
import merge from 'lodash-es/merge';
import { CaptionOptions, CreditsOptions, Options, SeriesOptionsType, TitleOptions, XAxisLabelsOptions, XAxisOptions } from 'highcharts';
import { isValid, parseISO } from 'date-fns'

import { DiagramType } from '../fhi-diagram-types/fhi-diagram-type.model';
import { DiagramTypeList } from '../fhi-diagram-types/fhi-diagram-types';
import { FhiHighchartsGeoJsonService } from './fhi-highcharts-geo-json.service';
import { FhiHighchartsConfig, FhiSerie } from '../fhi-highcharts-config.model';
import { OptionsChartsAndMaps } from '../highcharts-options/options-charts-and-maps';
import { OptionsCharts } from '../highcharts-options/options-charts';
import { OptionsMaps } from '../highcharts-options/options-maps';

@Injectable({
  providedIn: 'root'
})
export class FhiHighchartsOptionsService {

  constructor(private geoJsonService: FhiHighchartsGeoJsonService) {
    this.diagramtypeList = DiagramTypeList;
    this.setAllStaticOptions();
  }

  private allStaticOptions = new Map();
  private diagramtypeList: DiagramType[];

  updateOptions(config: FhiHighchartsConfig, allMapsLoaded: boolean): Options {
    const options: Options = cloneDeep(this.allStaticOptions.get(config.diagramtype.id));
    options.title = { text: config.title, align: 'left' } as TitleOptions;
    options.caption = this.getCaptionText(options.caption, config.captionLastUpdated, config.captionDisclaimer);
    options.credits = this.getCredits(options.credits, config.creditsHref, config.creditsText, config.diagramtype.isMap);
    options.series = this.getSeries(config.series, config.diagramtype.isMap, allMapsLoaded);
    if (!config.diagramtype.isMap) {
      options.xAxis = this.getXaxis(options.xAxis as XAxisOptions, config.series);
    }
    // TODO: leftover from first iteration...
    // if (test for small multiple is true) {
    //   return this.optionsModifiedForSmallMultiple(options, config);
    // }
    return options;
  }

  private setAllStaticOptions() {
    this.diagramtypeList.forEach(DiagramType => {
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

  private getSeries(series: FhiSerie[], isMap: boolean | undefined, allMapsLoaded: boolean): SeriesOptionsType[] {
    if (isMap && allMapsLoaded) {
      return [this.geoJsonService.getHighmapsSerie(series[0])];
    } else {
      return series as SeriesOptionsType[];
    }
  }

  private getXaxis(xAxis: XAxisOptions, series: FhiSerie[]): XAxisOptions | XAxisOptions[] {
    xAxis = (xAxis) ? xAxis : {};
    xAxis.labels = this.getFormattedLabels(series);
    return xAxis;
  }

  private getFormattedLabels(series: FhiSerie[]): XAxisLabelsOptions {
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

  // TODO: leftover from first iteration...
  // private optionsModifiedForSmallMultiple(options: Options, config: FhiHighchartsConfig): Options {
  //   if (config.smallMultiple !== undefined) {
  //     options.legend = {
  //       ...options.legend,
  //       enabled: (config.smallMultiple.disableLegend) ? false : true
  //     };
  //     options.yAxis = {
  //       ...options.yAxis,
  //       max: config.smallMultiple.yAxisMax,
  //       min: config.smallMultiple.yAxisMin
  //     };
  //   }
  //   options.title = undefined;
  //   options.caption = undefined;
  //   options.credits = undefined;
  //   return options;
  // }

}

