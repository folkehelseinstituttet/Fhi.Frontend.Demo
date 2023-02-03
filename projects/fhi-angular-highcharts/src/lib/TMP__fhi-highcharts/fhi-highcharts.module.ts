import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';

import { FhiHighchartsComponent } from './fhi-highcharts.component';

@NgModule({
  declarations: [
    FhiHighchartsComponent
  ],
  imports: [
    CommonModule,
    HighchartsChartModule
  ],
  exports: [
    FhiHighchartsComponent
  ]
})
export class FhiHighchartsModule { }
