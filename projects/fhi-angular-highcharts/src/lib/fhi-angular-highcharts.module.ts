import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

import {
  FhiModalComponent,
  FhiPopoverMenuComponent,
} from '@folkehelseinstituttet/angular-components';

import { DownloadService } from './services/download.service';
import { OptionsService } from './services/options.service';
import { TableService } from './services/table.service';
import { DiagramTypeGroupService } from './services/diagram-type-group.service';
import { TopoJsonService } from './services/topo-json.service';
import { MetadataForSeriesService } from './services/metadata-for-series.service';

import { FhiAngularHighchartsComponent } from './fhi-angular-highcharts.component';
import { FhiDiagramTypeNavDefaultComponent } from './fhi-diagram-type-navs/fhi-diagram-type-nav-default/fhi-diagram-type-nav-default.component';

@NgModule({
  declarations: [FhiAngularHighchartsComponent],
  imports: [
    CommonModule,
    FormsModule,
    HighchartsChartModule,
    NgbPopoverModule,
    FhiModalComponent,
    FhiPopoverMenuComponent,
    FhiDiagramTypeNavDefaultComponent,
  ],
  exports: [FhiAngularHighchartsComponent],
  providers: [
    TopoJsonService,
    DiagramTypeGroupService,
    DownloadService,
    OptionsService,
    TableService,
    MetadataForSeriesService,
  ],
})
export class FhiAngularHighchartsModule {}
