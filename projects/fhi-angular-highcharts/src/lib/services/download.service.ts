import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { Options, ExportingMimeTypeValue, ExportingOptions } from 'highcharts';

import { ChartInstanceService } from './chart-instance.service';
import { CsvService } from './csv.service';
import { FhiDiagramOptions } from '../fhi-diagram/fhi-diagram-options.model';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(
    private chartInstanceService: ChartInstanceService,
    private csvService: CsvService
  ) { }

  private diagramOptions!: FhiDiagramOptions;

  setConfig(diagramOptions: FhiDiagramOptions) {
    this.diagramOptions = diagramOptions;
  }

  downloadImage(MIMEtype: ExportingMimeTypeValue) {
    const exportingOptions: ExportingOptions = {
      type: MIMEtype,
      sourceWidth: 1200,
      sourceHeight: 800,
      filename: this.getFilename()
    };
    const chartOptions: Options = {
      chart: {
        spacingBottom: (this.diagramOptions.disclaimer) ? 100 : 50
      }
    };
    this.chartInstanceService.chart.exportChartLocal(exportingOptions, chartOptions);
  }

  downloadCSV() {
    const filename = this.getFilename().concat('.csv');
    const credits = `"${this.diagramOptions.creditsText}"\n\n\n`;
    this.downloadBlob(credits.concat(this.csvService.csv), filename);
  }

  private getFilename() {
    const today = formatDate(new Date(), 'yyyy-MM-dd', 'nb-NO');
    const title = this.diagramOptions.title.replace(/ /gi, '-').replace(/,/gi, '').replace(/---/gi, '-');
    const filename = today.concat('.', title.toLowerCase());
    return filename;
  }

  private downloadBlob(blob: string, filename: string) {
    const body = window.document.body;
    const link = document.createElement('a');
    const url = URL.createObjectURL(new Blob(['\ufeff', blob]));
    link.href = url;
    link.download = filename;
    body.appendChild(link);
    link.click();
    body.removeChild(link);
  }

}
