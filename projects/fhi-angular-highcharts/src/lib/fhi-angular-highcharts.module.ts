import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';

import { FhiAngularHighchartsComponent } from './fhi-angular-highcharts.component';

@NgModule({
  declarations: [
    FhiAngularHighchartsComponent
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
