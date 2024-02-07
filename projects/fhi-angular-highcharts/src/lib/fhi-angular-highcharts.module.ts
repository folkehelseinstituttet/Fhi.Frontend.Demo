import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

import { FhiModalComponent } from '@folkehelseinstituttet/angular-components';

import { FhiAngularHighchartsComponent } from './fhi-angular-highcharts.component';
import { FhiDiagramTypeNavComponent } from './fhi-diagram-type-navs/fhi-diagram-type-nav.component';

import { TopoJsonService } from './services/topo-json.service';
import { DiagramTypeService } from './services/diagram-type.service';
import { OptionsService } from './services/options.service';
import { TableService } from './services/table.service';

@NgModule({
  declarations: [FhiAngularHighchartsComponent, FhiDiagramTypeNavComponent],
  imports: [
    CommonModule,
    FormsModule,
    HighchartsChartModule,
    NgbPopoverModule,
    FhiModalComponent,
    RouterModule,
  ],
  exports: [FhiAngularHighchartsComponent],
  providers: [TopoJsonService, DiagramTypeService, OptionsService, TableService],
})
export class FhiAngularHighchartsModule {}
