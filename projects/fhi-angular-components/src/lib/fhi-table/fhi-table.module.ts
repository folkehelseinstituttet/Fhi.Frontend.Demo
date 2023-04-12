import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FhiTableComponent } from './fhi-table.component';

@NgModule({
  declarations: [
    FhiTableComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FhiTableComponent
  ]
})
export class FhiTableModule { }
