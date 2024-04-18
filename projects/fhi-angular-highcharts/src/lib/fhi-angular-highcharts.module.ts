import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

import { FhiModalComponent } from '@folkehelseinstituttet/angular-components';

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
    FhiDiagramTypeNavDefaultComponent,
  ],
  exports: [FhiAngularHighchartsComponent],
})
export class FhiAngularHighchartsModule {}
