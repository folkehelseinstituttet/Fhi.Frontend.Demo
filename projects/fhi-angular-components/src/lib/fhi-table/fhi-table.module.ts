import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FhiTableComponent } from './fhi-table.component';
import { FhiTableRowExpandableComponent } from './row-components/fhi-table-row-expandable/fhi-table-row-expandable.component';
import { FhiTableRowExpanderComponent } from './row-components/fhi-table-row-expander/fhi-table-row-expander.component';

@NgModule({
  declarations: [
    FhiTableComponent,
    FhiTableRowExpanderComponent,
    FhiTableRowExpandableComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FhiTableComponent,
    FhiTableRowExpanderComponent,
    FhiTableRowExpandableComponent
  ]
})
export class FhiTableModule { }
