import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';

import { FhiAngularHighchartsComponent } from './fhi-angular-highcharts.component';
import { FhiDiagramTypeNavigationComponent } from './fhi-diagram-type-navigation/fhi-diagram-type-navigation.component';

@NgModule({
  declarations: [
    FhiAngularHighchartsComponent,
    FhiDiagramTypeNavigationComponent
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
