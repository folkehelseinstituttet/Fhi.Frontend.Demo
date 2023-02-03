import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import cloneDeep from 'lodash-es/cloneDeep';
import merge from 'lodash-es/merge';
import { CaptionOptions, CreditsOptions, Options, SeriesOptionsType, XAxisLabelsOptions, XAxisOptions } from 'highcharts';
import { isValid, parseISO } from 'date-fns'

import { FellesfunksjonerService } from '../../services/fellesfunksjoner.service';
import { Diagramtype } from '../fhi-highcharts-diagramtyper';
import { FhiHighchartsDiagramtypeService } from './fhi-highcharts-diagramtype.service';
import { FhiHighchartsGeoJsonService } from './fhi-highcharts-geo-json.service';
import { FhiHighchartsConfig, FhiSerie } from '../fhi-highcharts-config.model';
import { OptionsChartsAndMaps } from '../options/options-charts-and-maps';
import { OptionsCharts } from '../options/options-charts';
import { OptionsMaps } from '../options/options-maps';

@Injectable({
  providedIn: 'root'
})
export class FhiHighchartsOptionsService {

  constructor(
    private diagramtypeService: FhiHighchartsDiagramtypeService,
    private geoJsonService: FhiHighchartsGeoJsonService,
    private fellesfunksjonerService: FellesfunksjonerService
  ) {
    this.diagramtypeList = this.diagramtypeService.getDiagramtypeList();
    this.setAllStaticOptions();
  }

  private allStaticOptions = new Map();
  private diagramtypeList: Diagramtype[];

  updateOptions(config: FhiHighchartsConfig, allMapsLoaded: boolean): Options {
    const options: Options = this.allStaticOptions.get(config.diagramtype.id);
    options.title.text = config.title;
    options.caption = this.getCaptionText(options.caption, config.captionLastUpdated, config.captionDisclaimer);
    options.credits = this.getCredits(options.credits, config.creditsHref, config.creditsText, config.diagramtype.isMap);
    options.series = this.getSeries(config.series, config.diagramtype.isMap, allMapsLoaded);
    if (!config.diagramtype.isMap) {
      options.xAxis = this.getXaxis(options.xAxis, config.series);
    }
    return options;
  }

  private setAllStaticOptions() {
    this.diagramtypeList.forEach(Diagramtype => {
      const optionsCurrentChartType = Diagramtype.options;
      const isMap = Diagramtype.isMap;
      const staticOptions = this.setStaticOptions(optionsCurrentChartType, isMap);
      this.allStaticOptions.set(Diagramtype.id, staticOptions);
    });
  }

  private setStaticOptions(optionsCurrentChartType: Options, isMap: boolean): Options {
    const chartsAndMaps = cloneDeep(OptionsChartsAndMaps);
    const chartsOrMaps = (isMap) ? cloneDeep(OptionsMaps) : cloneDeep(OptionsCharts);
    return merge(chartsAndMaps, chartsOrMaps, optionsCurrentChartType);
  }

  private getCaptionText(caption: CaptionOptions, lastUpdated: string, disclaimerHtml: string) {
    const disclaimer = (disclaimerHtml === undefined) ? false : true;
    const lastUpdatedHtml = `<p>Oppdatert: ${lastUpdated}</p>`;
    caption.text = lastUpdatedHtml + ((disclaimer) ? disclaimerHtml : '');
    if (!disclaimer) {
      caption.y = 32;
    }
    return caption;
  }

  private getCredits(credits: CreditsOptions, href: string, text: string, isMap: boolean) {
    if (isMap) {
      credits.text = '<a href="' + href + '">' + text + '</a>';
    } else {
      credits.href = href;
      credits.text = text;
    }
    return credits;
  }

  private getSeries(series: FhiSerie[], isMap: boolean, allMapsLoaded: boolean): SeriesOptionsType[] {
    if (isMap && allMapsLoaded) {
      return [this.geoJsonService.getHighmapsSerie(series[0])];
    } else {
      return series as SeriesOptionsType[];
    }
  }

  private getXaxis(xAxis: XAxisOptions | XAxisOptions[], series: FhiSerie[]): XAxisOptions | XAxisOptions[] {
    xAxis['labels'] = this.getFormattedLabels(series);
    return xAxis;
  }

  private getFormattedLabels(series: FhiSerie[]): XAxisLabelsOptions {
    const isDayLabels = isValid(parseISO(this.fellesfunksjonerService.getISO8601DatoFraNorskDato(series[0].data[0].name)));
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
      formatter: (that: Highcharts.AxisLabelsFormatterContextObject<string>) => {
        const value: string = that.value.toString();
        if (value.substr(0, 2) === '01') {
          return formatDate(this.fellesfunksjonerService.getISO8601DatoFraNorskDato(value), 'LLL', 'nb-NO');
        }
      }
    };
  }

  private formatDayLabelsAsDaySlashMonth(): XAxisLabelsOptions {
    return {
      formatter: (that: Highcharts.AxisLabelsFormatterContextObject<string>) => {
        const value: string = that.value.toString();
        return formatDate(this.fellesfunksjonerService.getISO8601DatoFraNorskDato(value), 'd/M', 'nb-NO');
      }
    };
  }

}

