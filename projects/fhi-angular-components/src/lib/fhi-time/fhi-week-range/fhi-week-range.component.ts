import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FhiWeekpickerComponent } from '../fhi-weekpicker/fhi-weekpicker.component';

@Component({
  selector: 'fhi-week-range',
  standalone: true,
  imports: [ CommonModule, FhiWeekpickerComponent ],
  templateUrl: './fhi-week-range.component.html'
})
export class FhiWeekRangeComponent {
  @Input() fromWeekLabel: string = 'Fra uke';
  @Input() toWeekLabel: string = 'Til uke';

  fromWeekId: string = 'from-week_' + Math.random().toString(36).substring(2, 20);
  toWeekId: string = 'to-week_' + Math.random().toString(36).substring(2, 20);
}
