import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FhiWeekSelectorComponent } from './fhi-week-selector.component';



@NgModule({
  imports: [
    CommonModule,
    FhiWeekSelectorComponent
  ],
  exports: [
    FhiWeekSelectorComponent
  ]
})
export class FhiWeekSelectorModule { }
