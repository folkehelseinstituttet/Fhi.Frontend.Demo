import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';

import { FhiAngularHighchartsComponent } from './fhi-angular-highcharts.component';
import { FhiDiagramTypeNavComponent } from './fhi-diagram-type-navs/fhi-diagram-type-nav.component';

@NgModule({
  declarations: [
    FhiAngularHighchartsComponent,
    FhiDiagramTypeNavComponent
  ],
  imports: [
    CommonModule,
    HighchartsChartModule
  ],
  exports: [
    FhiAngularHighchartsComponent
  ]
})
export class FhiAngularHighchartsModule { }
