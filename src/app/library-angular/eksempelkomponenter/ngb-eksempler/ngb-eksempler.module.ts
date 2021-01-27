import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';

import { NgbEksemplerComponent } from './ngb-eksempler.component';
import { NgbDatepickerArrowComponent } from './ngb-datepicker-arrow/ngb-datepicker-arrow.component';
import { NgbDatepickerSelectComponent } from './ngb-datepicker-select/ngb-datepicker-select.component';

@NgModule({
  declarations: [
    NgbEksemplerComponent,
    NgbDatepickerArrowComponent,
    NgbDatepickerSelectComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    NgbEksemplerComponent,
    NgbDatepickerArrowComponent,
    NgbDatepickerSelectComponent
  ]
})
export class NgbEksemplerModule { }
