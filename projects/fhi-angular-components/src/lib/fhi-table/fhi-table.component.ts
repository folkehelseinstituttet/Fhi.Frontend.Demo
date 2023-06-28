import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'fhi-table',
  templateUrl: './fhi-table.component.html',
  encapsulation: ViewEncapsulation.None
})
export class FhiTableComponent {

  @Input() tableConfig: any = {};

}
