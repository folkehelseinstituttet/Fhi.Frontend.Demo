import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FhiDatepickerComponent } from './fhi-datepicker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FhiDatepickerComponent
  ],
  exports: [
    FhiDatepickerComponent
  ]
})
export class FhiDatepickerModule { }
