import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { FhiAutosuggestComponent } from './fhi-autosuggest.component';

@NgModule({
  declarations: [FhiAutosuggestComponent],
  imports: [CommonModule, FormsModule, NgSelectModule],
  exports: [FhiAutosuggestComponent],
})
export class FhiAutosuggestModule {}
