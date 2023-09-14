import { Component, Injectable, Input } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'fhi-datepicker',
  templateUrl: './fhi-datepicker.component.html',
  standalone: true,
  imports: [
    NgbDatepickerModule,
    NgbAlertModule,
    FormsModule,
    JsonPipe
  ],
})
export class FhiDatepickerComponent {
  model: NgbDateStruct;

  ngOnInit() {
    console.log(this.model);
  }
}
