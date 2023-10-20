import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FhiYearSelectorComponent } from './fhi-year-selector.component';

@NgModule({
  imports: [
    CommonModule,
    FhiYearSelectorComponent
  ],
  exports: [
    FhiYearSelectorComponent
  ]
})
export class FhiYearSelectorModule { }
