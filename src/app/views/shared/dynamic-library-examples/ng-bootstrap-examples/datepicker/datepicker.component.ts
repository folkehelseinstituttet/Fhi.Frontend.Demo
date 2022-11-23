import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html'
})
export class DatepickerExampleComponent {

  @Input() itemId!: string;
  @Input() itemIds!: any;

}
