import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';

import { NgbExamplesComponent } from './ngb-examples.component';
import { NgbDatepickerArrowComponent } from './ngb-datepicker-arrow/ngb-datepicker-arrow.component';
import { NgbDatepickerSelectComponent } from './ngb-datepicker-select/ngb-datepicker-select.component';

@NgModule({
  declarations: [
    NgbExamplesComponent,
    NgbDatepickerArrowComponent,
    NgbDatepickerSelectComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    NgbExamplesComponent,
    NgbDatepickerArrowComponent,
    NgbDatepickerSelectComponent
  ]
})
export class NgbEksemplerModule { }
