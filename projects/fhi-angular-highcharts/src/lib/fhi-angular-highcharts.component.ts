import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';
import { first } from 'rxjs/operators';
import * as Highcharts from 'highcharts'; // https://github.com/highcharts/highcharts/issues/14183, hvis Highcharts endrer fra CommonJS til ECMAScript modules i fremtidig versjon, fjern følgende fra angular.json: "allowedCommonJsDependencies": ["highcharts"]
import { Options, Chart } from 'highcharts'; // https://github.com/highcharts/highcharts/issues/14183, hvis Highcharts endrer fra CommonJS til ECMAScript modules i fremtidig versjon, fjern følgende fra angular.json: "allowedCommonJsDependencies": ["highcharts"]
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsOfflineExporting from 'highcharts/modules/offline-exporting';
import HighchartsExportData from 'highcharts/modules/export-data';
import HighchartsMap from 'highcharts/modules/map';

// TODO: rename (either FhiAngularHighcharts or just Highcharts)
import { FhiHighchartsConfig } from './fhi-highcharts-config.model';
import { FhiHighchartsOptionsService } from './services/fhi-highcharts-options.service';
import { FhiHighchartsTableService } from './services/fhi-highcharts-table.service';
import { FhiHighchartsChartInstanceService } from './services/fhi-highcharts-chart-instance.service';
import { FhiHighchartsCsvService } from './services/fhi-highcharts-csv.service';
import { FhiHighchartsDownloadService } from './services/fhi-highcharts-download.service';
import { FhiHighchartsGeoJsonService } from "./services/fhi-highcharts-geo-json.service";

import { DiagramType } from './fhi-diagram-types/fhi-diagram-type.model';
import { DiagramTypes } from './fhi-diagram-types/fhi-diagram-types';

enum DiagramTemplates { chart = 'chart', map = 'map', table = 'table' };

@Component({
  selector: 'fhi-angular-highcharts',
  templateUrl: './fhi-angular-highcharts.component.html'
})
export class FhiAngularHighchartsComponent {

  highcharts = Highcharts;
  currentDiagramTemplate!: string;

  constructor() { }

}
