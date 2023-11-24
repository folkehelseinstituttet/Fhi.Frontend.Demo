import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FhiDateAndTimeComponent } from './fhi-date-and-time.component';

@NgModule({
  imports: [CommonModule, FormsModule, FhiDateAndTimeComponent],
  exports: [FhiDateAndTimeComponent],
})
export class FhiDateAndTimeModule {}
