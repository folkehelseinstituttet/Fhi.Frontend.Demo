import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FhiAutosuggestComponent } from './fhi-autosuggest.component';

@NgModule({
  declarations: [
    FhiAutosuggestComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FhiAutosuggestComponent
  ]
})
export class FhiAutosuggestModule { }
