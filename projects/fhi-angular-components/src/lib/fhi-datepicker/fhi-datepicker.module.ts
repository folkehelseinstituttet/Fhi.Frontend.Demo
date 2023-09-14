import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FhiDatepickerComponent } from './fhi-datepicker.component';

@NgModule({
  declarations: [
    FhiDatepickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    FhiDatepickerComponent
  ]
})
export class FhiDatepickerModule { }
