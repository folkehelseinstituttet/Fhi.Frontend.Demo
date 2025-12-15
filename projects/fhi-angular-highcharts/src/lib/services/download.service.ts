import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import {
  Chart,
  CreditsOptions,
  ExportingMimeTypeValue,
  ExportingOptions,
  Options,
  SubtitleOptions,
  TitleOptions,
} from 'highcharts';
import { FhiDiagramOptions } from '../models/fhi-diagram-options.model';

@Injectable()
export class DownloadService {
  exportWidth = 1200;
  baseHeight = 700;

  downloadImage(
    chartInstance: Chart,
    MIMEtype: ExportingMimeTypeValue,
    diagramOptions: FhiDiagramOptions,
  ) {
    if (!chartInstance) {
      console.warn(`No "chartInstance", can't download chart.`);
      return;
    }

    const isSvg = MIMEtype === 'image/svg+xml';
    const exportWidth = this.exportWidth;
    const baseHeight = this.baseHeight;

    const exportHeight = isSvg ? this.getSvgExportHeight(chartInstance, baseHeight) : baseHeight;

    const exportingOptions: ExportingOptions = {
      type: MIMEtype,
      sourceWidth: exportWidth,
      sourceHeight: exportHeight,
      filename: this.getFilename(diagramOptions.title),
    };

    const chartOptions: Options = {
      title: this.getTitle(diagramOptions),
      subtitle: this.getSubtitle(diagramOptions),
      credits: this.getCredits(diagramOptions),
    };

    if (isSvg) {
      chartOptions.legend = this.getSvgLegendOptions();
      chartOptions.chart = { height: exportHeight };
    }

    chartInstance.exportChartLocal(exportingOptions, chartOptions);
  }

  private getSvgLegendOptions(): Options['legend'] {
    return {
      navigation: { enabled: false },
      verticalAlign: 'bottom',
    };
  }

  private getSvgExportHeight(chartInstance: Chart, baseHeight: number): number {
    const legendCount = chartInstance.legend?.allItems?.length ?? 0;
    if (legendCount === 0) {
      return baseHeight;
    }

    const legendItemsPerRow = 5;
    const legendRowCount = Math.ceil(legendCount / legendItemsPerRow);

    const extraRows = Math.max(0, legendRowCount - 1);

    const legendRowHeight = 20;
    const legendPadding = 40;

    return baseHeight + extraRows * legendRowHeight + legendPadding;
  }

  private getFilename(title: string) {
    const formattedTitle = title.replace(/ /gi, '-').replace(/,/gi, '').replace(/---/gi, '-');
    const today = formatDate(new Date(), 'yyyy-MM-dd', 'nb-NO');
    const filename = today.concat('.', formattedTitle.toLowerCase());
    return filename;
  }

  private getTitle(diagramOptions: FhiDiagramOptions): TitleOptions {
    if (diagramOptions.title) {
      return {
        align: 'left',
        text: diagramOptions.title,
      };
    }
    return null;
  }

  private getSubtitle(diagramOptions: FhiDiagramOptions): SubtitleOptions {
    if (diagramOptions.description) {
      return {
        align: 'left',
        text: diagramOptions.description,
      };
    }
    return null;
  }

  private getCredits(diagramOptions: FhiDiagramOptions): CreditsOptions {
    if (
      diagramOptions.footer?.credits?.text &&
      (diagramOptions.activeDiagramType === 'mapFylker' ||
        diagramOptions.activeDiagramType === 'mapFylker2019' ||
        diagramOptions.activeDiagramType === 'mapFylker2023')
    ) {
      return {
        enabled: true,
        text: 'Kilde ' + diagramOptions.footer.credits.text + ', kartdata fra', // Highcharts adds " © [map provider]" automagically at the end
      };
    }
    if (diagramOptions.footer?.credits?.text) {
      return {
        enabled: true,
        text: 'Kilde ' + diagramOptions.footer.credits.text,
      };
    }
    return {
      enabled: false,
    };
  }
}
