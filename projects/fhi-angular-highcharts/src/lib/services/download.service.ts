import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { Chart, ExportingMimeTypeValue, ExportingOptions, Options } from 'highcharts';
import { FhiDiagramOptions } from '../models/fhi-diagram-options.model';

@Injectable()
export class DownloadService {
  downloadImage(
    chartInstance: Chart,
    MIMEtype: ExportingMimeTypeValue,
    diagramOptions: FhiDiagramOptions,
  ) {
    if (!chartInstance) {
      console.warn(`No "chartInstance", can't download chart.`);
      return;
    }
    const exportingOptions: ExportingOptions = {
      type: MIMEtype,
      sourceWidth: 1200,
      sourceHeight: 800,
      filename: this.getFilename(diagramOptions.title),
    };
    const chartOptions: Options = {
      title: (() => {
        if (diagramOptions.title) {
          return {
            align: 'left',
            text: diagramOptions.title,
          };
        }
        return null;
      })(),

      subtitle: (() => {
        if (diagramOptions.description) {
          return {
            align: 'left',
            text: diagramOptions.description,
          };
        }
        return null;
      })(),

      credits: (() => {
        if (diagramOptions.footer.credits.text) {
          return {
            enabled: true,
            text: diagramOptions.footer.credits.text,
          };
        }
        return null;
      })(),
    };

    chartInstance.exportChartLocal(exportingOptions, chartOptions);
  }

  private getFilename(title: string) {
    const formattedTitle = title.replace(/ /gi, '-').replace(/,/gi, '').replace(/---/gi, '-');
    const today = formatDate(new Date(), 'yyyy-MM-dd', 'nb-NO');
    const filename = today.concat('.', formattedTitle.toLowerCase());
    return filename;
  }
}
