import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { Chart, ExportingMimeTypeValue, ExportingOptions } from 'highcharts';

@Injectable()
export class DownloadService {
  downloadImage(chartInstance: Chart, MIMEtype: ExportingMimeTypeValue, title: string) {
    if (!chartInstance) {
      console.warn(`No "chartInstance", can't download chart.`);
      return;
    }
    const exportingOptions: ExportingOptions = {
      type: MIMEtype,
      sourceWidth: 1200,
      sourceHeight: 800,
      filename: this.getFilename(title),
    };
    chartInstance.exportChartLocal(exportingOptions);
  }

  private getFilename(title: string) {
    const formattedTitle = title.replace(/ /gi, '-').replace(/,/gi, '').replace(/---/gi, '-');
    const today = formatDate(new Date(), 'yyyy-MM-dd', 'nb-NO');
    const filename = today.concat('.', formattedTitle.toLowerCase());
    return filename;
  }
}
