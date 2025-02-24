import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fhi-table',
    templateUrl: './fhi-table.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class FhiTableComponent {
  @Input() tableConfig: any = {};
}
