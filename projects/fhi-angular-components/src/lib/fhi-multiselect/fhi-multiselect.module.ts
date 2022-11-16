import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { FhiMultiselectComponent } from './fhi-multiselect.component';

@NgModule({
  declarations: [
    FhiMultiselectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule
  ],
  exports: [
    FhiMultiselectComponent
  ]
})
export class FhiMultiselectModule { }
